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
	this.whitePixelId = this.context.createImageData(1, 1);
	this.whitePixelId.data[0] = 255;
	this.whitePixelId.data[1] = 255;
	this.whitePixelId.data[2] = 255;
	this.whitePixelId.data[3] = 255;
}

CaveView.prototype.draw = function(gridModel)
{
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	this.context.rect(0, 0, this.canvas.width, this.canvas.height);
	this.context.fillStyle = 'black';
	this.context.fill();
	this.drawLines();
	for (var i = 0; i < this.width; i++)
	{
		for (var j = 0; j < this.height; j++)
		{
			this.drawAtGridCoordinates(i, j, gridModel.getTileAtCoordinates(i, j));
		}
	}

}

CaveView.prototype.drawLines = function()
{
	var view = this;
	var offset = view.tileSize;
	for (var i = 1; i < this.width; i++) 
	{
		var x = i * view.tileSize + view.border.left;
		view.plotLine(x, view.border.top + offset, x, view.height * view.tileSize + view.border.top - offset)
	}

	for (var i = 1; i < this.height; i++) 
	{
		var y = i * view.tileSize + view.border.top;
		view.plotLine(view.border.left + offset, y, view.width * view.tileSize + view.border.left - offset, y);
	}
}

CaveView.prototype.drawAtGridCoordinates = function(x, y, tile)
{
	var view = this;
	var left = x * view.tileSize + view.border.left;
	var top = y * view.tileSize + view.border.top;
	var size = view.tileSize;
	var offset = 1;
	if (tile.symbol == 'x')
	{
		this.context.beginPath();
		this.context.rect(left + offset, top + offset, size - offset, size - offset);
		this.context.fillStyle = 'gray';
		this.context.fill();
	}
	else if (tile.symbol == ' ')
	{
		this.context.beginPath();
		this.context.rect(left + offset, top + offset, size - offset, size - offset);
		this.context.fillStyle = 'black';
		this.context.fill();		
	}
	else
	{
		var image = new Image();
		var context = this.context;
		image.onload = function()
		{
			context.drawImage(image, left + offset, top + offset, size - offset, size - offset);
		}
		image.src = "images/" + tile.fileName + ".png";
	}
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

CaveView.prototype.paintPositions = function(paintedPositions)
{
	for (var i = 0; i < paintedPositions.length; i++) 
	{
		this.drawAtGridCoordinates(paintedPositions[i].x, paintedPositions[i].y, paintedPositions[i].brush);
	}
}

CaveView.prototype.plotLine = function(x0, y0, x1, y1)
{
	var dx =  Math.abs(x1 - x0), sx = x0 < x1 ? 1 : -1;
	var dy = -Math.abs(y1 - y0), sy = y0 < y1 ? 1 : -1;
	var err = dx + dy, e2;                                   

	for (;;)
	{                                                          
		this.setPixel(x0, y0);
		if ((x0 == x1 && y0 == y1) || this.outOfBounds(x0, y0)) break;
		e2 = 2 * err;
		if (e2 >= dy) 
		{ 
			err += dy; 
			x0 += sx; 
		}                        
		if (e2 <= dx) 
		{ 
			err += dx;
			y0 += sy; 
		}                        
	}
}

CaveView.prototype.outOfBounds = function(x, y)
{
	var xLimit = (this.width - 1) * this.tileSize + this.border.left;
	var yLimit = (this.height - 1) * this.tileSize + this.border.top;
	return (x < 0 || y < 0 || x > xLimit || y > yLimit);
}

CaveView.prototype.setPixel = function(x, y)
{
	this.context.putImageData(this.whitePixelId, x, y);
}
