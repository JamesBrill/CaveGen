var CaveView = function(x, y, tileSize, border)
{
	this.location = {x:0, y:0};
	this.tileSize = tileSize;
	this.border = (border == undefined) ? { top: 0, left: 0 } : border;
	this.pixelWidth = CAVE_DISPLAY_SIZE;
	this.pixelHeight = CAVE_DISPLAY_SIZE;
	this.width = x;
	this.height = y;
	this.canvas = document.getElementById("caveGridCanvas");
	this.canvas.width = this.pixelWidth;
	this.canvas.height = this.pixelHeight;
	this.context = this.canvas.getContext("2d");
	this.paintLineMode = false;
	this.isMouseDown = false;
}

CaveView.prototype.draw = function(gridModel)
{
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	this.context.rect(0, 0, this.canvas.width, this.canvas.height);
	this.context.fillStyle = 'black';
	this.context.fill();
	for (var i = 0; i < this.width; i++)
	{
		for (var j = 0; j < this.height; j++)
		{
			this.drawAtGridCoordinates(i, j, gridModel.getTileAtCoordinates(i, j));
		}
	}
}

CaveView.prototype.drawAtGridCoordinates = function(x, y, tile)
{
	var view = this;
	this.context.clearRect(x * view.tileSize + view.border.left, y * view.tileSize + view.border.top, view.tileSize, view.tileSize);
	var image = new Image();
	var context = this.context;
	image.onload = function()
	{
		context.drawImage(image, x * view.tileSize + view.border.left, y * view.tileSize + view.border.top, view.tileSize, view.tileSize);
	}
	image.src = "images/" + tile.fileName + ".png";
}

CaveView.prototype.getGridX = function(pixelX)
{
	pixelX -= this.border.left;
	return ((pixelX - (pixelX % this.tileSize)) / this.tileSize);   
}

CaveView.prototype.getGridY = function(pixelY)
{
	pixelY -= this.border.top;	
	return ((pixelY - (pixelY % this.tileSize)) / this.tileSize);   
}

CaveView.prototype.applyBrushAtPosition = function(brush, column, row, caveChange)
{
	var currentPoint = { x: column, y: row };

	if (this.paintLineMode)
	{
		var lineStart = this.previousPaintedPoint;
		var lineEnd = currentPoint;
		var positions = CaveNetwork.positionsBetweenPoints(lineStart, lineEnd)
		for (var i = 0; i < positions.length; i++)
		{
			this.drawRectangularCursor(brush, positions[i].x, positions[i].y, caveChange);
		}
	}
	else
	{
		this.drawRectangularCursor(brush, column, row, caveChange);
	}
	this.previousPaintedPoint = currentPoint;
}

CaveView.prototype.drawRectangularCursor = function(brush, x, y, caveChange)
{
	var cursorPositions = grid.getCoordinatesWithinRectangularCursor(brushSize, x, y);
	for (var i = 0; i < cursorPositions.length; i++)
	{
		var before = grid.getSymbolFromPosition(cursorPositions[i]);
		var tilesChanged = grid.applyBrushAtPosition(brush, cursorPositions[i]);
		if (tilesChanged)
		{
			this.drawAtGridCoordinates(cursorPositions[i].x, cursorPositions[i].y, brush);
			var after = grid.getSymbolFromPosition(cursorPositions[i]);
			var tileChange = new TileChange(cursorPositions[i].x, cursorPositions[i].y, before, after);
			caveChange.addTileChange(tileChange);
		}
	}
}