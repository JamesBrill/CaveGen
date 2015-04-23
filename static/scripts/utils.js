var twoDimensionalArray = function(x, y) 
{
	var grid = new Array(x);
	for (var i = 0; i < x; i++) {
		grid[i] = new Array(y);
	}
	return grid;
}

var getBorder = function(caveWidth, caveHeight)
{
	var widthHeightRatio = caveWidth / caveHeight;	
	var border;
	if (widthHeightRatio > 1)
	{
		var displayHeight = CAVE_DISPLAY_SIZE / widthHeightRatio;
		var borderThickness = Math.floor((CAVE_DISPLAY_SIZE - displayHeight) / 2);
		border = { top: borderThickness, left: 0 };
	}
	else
	{
		var displayWidth = CAVE_DISPLAY_SIZE * widthHeightRatio;
		var borderThickness = Math.floor((CAVE_DISPLAY_SIZE - displayWidth) / 2);
		border = { top: 0, left: borderThickness };
	}
	return border;
}

var getTileSize = function(caveWidth, caveHeight)
{
	var largestDimension = Math.max(caveWidth, caveHeight);
	return Math.floor(CAVE_DISPLAY_SIZE / largestDimension); 
}

var mergeTileChanges = function(first, second)
{
	var tileChanges = [];
	for (var i = 0; i < first.length; i++) 
	{
		tileChanges.push(first[i]);
	}
	for (var i = 0; i < second.length; i++) 
	{
		var merge = true;
		for (var j = 0; j < first.length; j++) 
		{
			if (second[i].equals(first[j]))
			{
				merge = false;
				break;
			}
		}
		if (merge)
		{
			tileChanges.push(second[i]);
		}
	}
	return tileChanges;
}