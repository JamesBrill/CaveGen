var CaveView = function(x, y, tileSize, border)
{
	this.location = { x: 0, y: 0 };
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
	this.previousPaintedPoint = { x: -1, y: -1 };
	this.paintLineMode = false;
	this.isMouseDown = false;
	this.linePainter = new LinePainter(this.context);
}

CaveView.prototype.draw = function(gridModel)
{
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	this.context.rect(0, 0, this.canvas.width, this.canvas.height);
	this.context.fillStyle = 'black';
	this.context.fill();
	this.drawMeasuringGrid();
	for (var i = 0; i < this.width; i++)
	{
		for (var j = 0; j < this.height; j++)
		{
			this.drawAtGridCoordinates(i, j, gridModel.getTileAtCoordinates(i, j));
		}
	}
}

CaveView.prototype.drawMeasuringGrid = function()
{
	var view = this;
	var offset = view.tileSize;
	this.linePainter.setColour("#FFFFFF");
	for (var i = 1; i < this.width; i++) 
	{
		var x = i * view.tileSize + view.border.left;
		this.linePainter.plotVerticalLine(x, view.border.top + offset,  
			view.border.top + view.height * view.tileSize - offset);
	}

	for (var i = 1; i < this.height; i++) 
	{
		var y = i * view.tileSize + view.border.top;
		this.linePainter.plotHorizontalLine(view.border.left + offset,  
			view.border.left + view.width * view.tileSize - offset, y);
	}
}

CaveView.prototype.drawAtGridCoordinates = function(x, y, tile)
{
	var view = this;
	var left = x * view.tileSize + view.border.left;
	var top = y * view.tileSize + view.border.top;
	var size = view.tileSize;
	if (tile.symbol == 'x')
	{
		this.drawSquare(left, top, size, "gray");
	}
	else if (tile.symbol == ' ')
	{
		this.drawSquare(left, top, size, "black");	
	}
	else
	{
		this.drawImage(left, top, size, tile.fileName);
	}
}

CaveView.prototype.drawSquare= function(left, top, size, colour)
{
	this.context.beginPath();
	this.context.rect(left + 1, top + 1, size - 1, size - 1);
	this.context.fillStyle = colour;
	this.context.fill();		
}

CaveView.prototype.drawImage = function(left, top, size, fileName)
{
	var image = new Image();
	var context = this.context;
	image.onload = function()
	{
		context.drawImage(image, left + 1, top + 1, size - 1, size - 1);
	}
	image.src = "images/" + fileName + ".png";	
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
			this.drawTileRectangle(brush, positions[i].x, positions[i].y, caveChange);
		}
	}
	else
	{
		this.drawTileRectangle(brush, column, row, caveChange);
	}
	this.previousPaintedPoint = currentPoint;
}

CaveView.prototype.drawTileRectangle = function(brush, x, y, caveChange)
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

CaveView.prototype.drawCursor = function(column, row)
{
	this.drawSquareOutline(column, row, "#FF0000");
}

CaveView.prototype.drawSquareOutline = function(column, row, colour, previousCursorSize)
{
	if (colour == undefined)
	{
		colour = "#FFFFFF";
	}
	var squareSize = (previousCursorSize == undefined) ? brushSize : previousCursorSize;
	var unboundedTop = (row - Math.floor(squareSize / 2)) * this.tileSize + this.border.top;
	var unboundedLeft = (column - Math.floor(squareSize / 2)) * this.tileSize + this.border.left;
	var unboundedBottom = unboundedTop + squareSize * this.tileSize;
	var unboundedRight = unboundedLeft + squareSize * this.tileSize;
	var top = Math.max(unboundedTop, this.border.top + this.tileSize);
	var left = Math.max(unboundedLeft, this.border.left + this.tileSize);
	var bottom = Math.min(unboundedBottom, this.border.top + this.tileSize * (this.height - 1));
	var right = Math.min(unboundedRight, this.border.left + this.tileSize * (this.width - 1));

	this.linePainter.setColour(colour);
	this.linePainter.plotVerticalLine(left, top, bottom);
	this.linePainter.plotHorizontalLine(left, right, bottom);
	this.linePainter.plotVerticalLine(right, bottom, top);
	this.linePainter.plotHorizontalLine(right, left, top);
}

CaveView.prototype.paintPositions = function(paintedPositions)
{
	for (var i = 0; i < paintedPositions.length; i++) 
	{
		this.drawAtGridCoordinates(paintedPositions[i].x, paintedPositions[i].y, paintedPositions[i].brush);
	}
}