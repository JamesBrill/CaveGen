var Cave = function(width, height)
{
	this.grid = this.createGrid(width, height);
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

Cave.prototype.applyBrushAtPosition = function(brush, position)
{
	if (this.grid[position.x][position.y] != brush.symbol)
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