var CaveGridView = function(x, y)
{
	this.location = {x:0, y:0};
	this.tileSize = 20;
	this.pixelWidth = x * this.tileSize;
	this.pixelHeight = y * this.tileSize;
	this.width = x;
	this.height = y;
	this.canvas = document.getElementById("caveGridCanvas");
	this.canvas.width = this.pixelWidth;
	this.canvas.height = this.pixelHeight;
	this.context = this.canvas.getContext("2d");
	this.paintLineMode = false;
	this.isMouseDown = false;
}

CaveGridView.prototype.draw = function(gridModel)
{
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	for (var i = 0; i < this.width; i++)
	{
		for (var j = 0; j < this.height; j++)
		{
			this.drawAtGridCoordinates(i, j, gridModel.getTileAtCoordinates(i, j));
		}
	}
}

CaveGridView.prototype.drawAtGridCoordinates = function(x, y, tile)
{
	var view = this;
	this.context.clearRect(x * view.tileSize, y * view.tileSize, view.tileSize, view.tileSize);
	var image = new Image();
	var context = this.context;
	image.onload = function()
	{
		context.drawImage(image, x * view.tileSize, y * view.tileSize, view.tileSize, view.tileSize);
	}
	image.src = "images/" + tile.fileName + ".png";
}

CaveGridView.prototype.getGridX = function(pixelX)
{
	return ((pixelX - (pixelX % this.tileSize)) / this.tileSize);   
}

CaveGridView.prototype.getGridY = function(pixelY)
{
	return ((pixelY - (pixelY % this.tileSize)) / this.tileSize);   
}

CaveGridView.prototype.applyBrushAtPosition = function(brush, column, row)
{
	var currentPoint = { x: column, y: row };

	if (this.paintLineMode)
	{
		var lineStart = this.previousPaintedPoint;
		var lineEnd = currentPoint;
		var positions = CaveNetwork.positionsBetweenPoints(lineStart, lineEnd)
		for (var i = 0; i < positions.length; i++)
		{
			this.drawRectangularCursor(brush, positions[i].x, positions[i].y);
		}
	}
	else
	{
		this.drawRectangularCursor(brush, column, row);
	}
	this.previousPaintedPoint = currentPoint;
}

CaveGridView.prototype.drawRectangularCursor = function(brush, x, y)
{
	var cursorPositions = grid.getCoordinatesWithinRectangularCursor(brushSize, x, y);
	for (var i = 0; i < cursorPositions.length; i++)
	{
		var tilesChanged = grid.applyBrushAtPosition(brush, cursorPositions[i]);
		if (tilesChanged)
		{
			this.drawAtGridCoordinates(cursorPositions[i].x, cursorPositions[i].y, brush);
		}
	}
}