var Cave = function(width, height)
{
	this.rebuildCaveFromCoordinates(width, height);
}

Cave.prototype.rebuildCaveFromCoordinates = function(x, y)
{
	this.grid = this.createGrid(x, y);
	this.width = x;
	this.height = y;
}

Cave.prototype.rebuildCaveFromGrid = function(grid)
{
	this.grid = grid.clone();
	this.width = grid[0].length;
	this.height = grid.length;	
}

Cave.prototype.rebuildCaveFromCaveString = function(caveString)
{
	var caveLines = caveString.split("\n");
	caveLines.splice(0, 4);
	caveLines.pop(); // Remove empty line at the end
	this.width = caveLines[0].length;
	this.height = caveLines.length; // Assumes lines all equal length
	this.grid = new twoDimensionalArray(this.width, this.height);
	for (var i = 0; i < this.width; i++)
	{
		for (var j = 0; j < this.height; j++)
		{
			var symbol = caveLines[j].charAt(i);
			var fileName = TileUtils.getFileNameFromSymbol(symbol);
			this.grid[i][j] = { fileName: fileName, symbol: symbol };
		}
	}
}

Cave.prototype.createGrid = function(x, y)
{
	var grid = new twoDimensionalArray(x, y);
	for (var i = 0; i < x; i++)
	{
		for (var j = 0; j < y; j++)
		{
			grid[i][j] = { fileName: "terrain", symbol: "x" };
		}
	}
	return grid;
}

Cave.prototype.getTileAtCoordinates = function(x, y)
{
	return this.grid[x][y];
}

Cave.prototype.setTileAtCoordinates = function(x, y, tile)
{
	this.grid[x][y] = tile;
}

Cave.prototype.getSymbolFromPosition = function(position)
{
	return this.getTileAtCoordinates(position.x, position.y).symbol;
}

Cave.prototype.getGridClone = function() { return this.grid.clone(); }

Cave.prototype.applyBrushAtPosition = function(brush, position)
{
	if (this.grid[position.x][position.y].symbol != brush.symbol)
	{
		this.grid[position.x][position.y] = brush;
		return true;
	}
	return false;
}

Cave.prototype.withinLimits = function(x, y)
{
	return x > 0 && y > 0 && x < this.grid.length - 1 && y < this.grid[0].length - 1;
}

Cave.prototype.getCoordinatesWithinRectangularCursor = function(brushSize, column, row)
{
	var coordinatesWithinRectangularCursor = new Array();
	var rowLimit = row + Math.floor(brushSize / 2) + 1;
	var columnLimit = column + Math.floor(brushSize / 2) + 1;
	if (brushSize % 2 == 0)
	{
		rowLimit--;
		columnLimit--;
	}
	for (var i = row - Math.floor(brushSize / 2); i < rowLimit; i++)
	{
		for (var j = column - Math.floor(brushSize / 2); j < columnLimit; j++)
		{
			if (this.withinLimits(j, i))
			{
				coordinatesWithinRectangularCursor.push({x : Math.round(j), y : Math.round(i)});
			}
		}
	}

	return coordinatesWithinRectangularCursor;
}