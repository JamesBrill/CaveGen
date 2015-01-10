var Cave = function(width, height)
{
	this.grid = this.createGrid(width, height);
	this.caveName = "_";
	this.terrainType = "1";
    this.waterType = "clear";
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

Cave.prototype.getCaveString = function()
{
    var caveString = "";
    caveString += this.caveName + "\n";
    caveString += "terrain " + this.terrainType + "\n";
    caveString += "background 1\n";
    caveString += "water " + this.waterType + "\n";

    for (var i = 0; i < this.grid.length; i++)
    {
        for (var j = 0; j < this.grid[0].length; j++)
        {
            caveString += this.grid[j][i].symbol;
        }
        caveString += "\n";
    }
    return caveString;
}

Cave.prototype.getUploadableCaveString = function()
{
    var caveString = this.getCaveString();
    return this.addMissingDoorAndStartingPosition(caveString);
}

Cave.prototype.addMissingDoorAndStartingPosition = function(caveString)
{
    if (caveString.indexOf("#") == -1)
    {
        caveString += "#";
    }
    if (caveString.indexOf("D") == -1)
    {
        caveString += "D";
    }
    return caveString;
}