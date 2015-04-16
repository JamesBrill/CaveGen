function LinePainter(context, tileSize, border)
{
	this.context = context;
	this.whitePixelId = this.context.createImageData(1, 1);
	this.whitePixelId.data[0] = 255;
	this.whitePixelId.data[1] = 255;
	this.whitePixelId.data[2] = 255;
	this.whitePixelId.data[3] = 255;
	this.tileSize = tileSize;
	this.border = border;
LinePainter.prototype.plotVerticalLine = function(x, y0, y1)
{
	this.context.fillRect(x, y0, 1, y1 - y0 + 1);	
}

LinePainter.prototype.plotHorizontalLine = function(x0, x1, y)
{
	this.context.fillRect(x0, y, x1 - x0 + 1, 1);	
}

LinePainter.prototype.plotLine = function(x0, y0, x1, y1)
{
	this.context.fillRect(x0, y0, x1 - x0 + 1, y1 - y0 + 1);	
}

LinePainter.prototype.plotLineWithNoAntiAliasing = function(x0, y0, x1, y1)
{
	var dx =  Math.abs(x1 - x0), sx = x0 < x1 ? 1 : -1;
	var dy = -Math.abs(y1 - y0), sy = y0 < y1 ? 1 : -1;
	var err = dx + dy, e2;                                   

	for (;;)
	{                                                          
		this.setPixelWithNoAntiAliasing(x0, y0);
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

LinePainter.prototype.outOfBounds = function(x, y)
{
	var xLimit = (this.width - 1) * this.tileSize + this.border.left;
	var yLimit = (this.height - 1) * this.tileSize + this.border.top;
	return (x < 0 || y < 0 || x > xLimit || y > yLimit);
}

LinePainter.prototype.setPixelWithNoAntiAliasing = function(x, y)
{
	this.context.putImageData(this.whitePixelId, x, y);
}