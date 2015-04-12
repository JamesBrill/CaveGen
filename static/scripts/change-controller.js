function ChangeController() 
{
	this.changeHistory = new CaveChangeHistory();
	this.currentPaintedLineChange = new PaintedLineChange(); // Inject this from the CVM into the CV.Apply... method
}

ChangeController.prototype.resetCurrentPaintedLineChange = function()
{
	this.currentPaintedLineChange = new PaintedLineChange();	
}

// Does not use clone of grid - assumes grid is about to be regenerated
ChangeController.prototype.buildGenerateCaveChange = function()
{
	var preGenerationSnapshot = grid.grid; // TODO: less silly name
	var postGenerationWidth = caveViewModel.caveWidth();
	var postGenerationHeight = caveViewModel.caveHeight();
	return new GenerateCaveChange(preGenerationSnapshot, postGenerationWidth, postGenerationHeight);
}

ChangeController.prototype.addPaintedLineChange = function()
{
	this.changeHistory.addChange(this.currentPaintedLineChange);
	this.resetCurrentPaintedLineChange();
}

ChangeController.prototype.addGenerateCaveChange = function()
{
	var generateCaveChange = this.buildGenerateCaveChange();
	this.changeHistory.addChange(generateCaveChange);
}

ChangeController.prototype.addTileChange = function(brush, column, row)
{
	caveView.applyBrushAtPosition(brush, column, row, this.currentPaintedLineChange);
}

ChangeController.prototype.getCurrentChange = function()
{
	return this.changeHistory.currentChange();
}

ChangeController.prototype.applyUndo = function()
{
	this.applyChange(true);
}

ChangeController.prototype.applyRedo = function()
{
	this.applyChange(false);
}

ChangeController.prototype.applyChange = function(isUndo)
{
	if (!isUndo)
	{
		this.changeHistory.rollForwardCurrentChange();
	}

	var currentChange = this.currentChange();
	if (this.currentChange() == undefined) { return; }

	if (currentChange instanceof PaintedLineChange)
	{
		this.applyPaintedLineChange(currentChange, isUndo);
	}
	else if (currentChange instanceof GenerateCaveChange)
	{
		this.applyGenerateCaveChange(currentChange, isUndo);
	}

	if (isUndo)
	{
		this.changeHistory.rollBackCurrentChange();
	}
}

ChangeController.prototype.applyPaintedLineChange = function(currentChange, isUndo)
{
    var tileChanges = currentChange.tileChanges;
    var paintedPositions = [];
    for (var i = 0; i < tileChanges.length; i++) 
    {
    	var x = tileChanges[i].xCoordinate;
    	var y = tileChanges[i].yCoordinate;
    	if (grid.withinLimits(x, y))
    	{
			var symbol = isUndo ? tileChanges[i].before : tileChanges[i].after;
			var fileName = TileUtils.getFileNameFromSymbol(symbol);
			var tile = { fileName: fileName, symbol: symbol };
			paintedPositions.push({ x: x, y: y, brush: tile });
    		grid.setTileAtCoordinates(x, y, tile);
    	}
    }
    caveView.paintPositions(paintedPositions);
}

ChangeController.prototype.applyGenerateCaveChange = function(currentChange, isUndo)
{
	if (isUndo)
	{
		var width = currentChange.preGenerationWidth;
		var height = currentChange.preGenerationHeight;
		var border = getBorder();
		var tileSize = getTileSize(width, height);	

		grid = currentChange.preGenerationSnapshot();
		caveView = new CaveView(width, height, tileSize, border);
		caveView.draw(grid); 
	}
	else
	{
		var width = currentChange.postGenerationWidth;
		var height = currentChange.postGenerationHeight;
		var border = getBorder();
		var tileSize = getTileSize(width, height);	

		grid.rebuildCave(width, height);
		caveView = new CaveView(width, height, tileSize, border);
		caveView.draw(grid); 
	}
}