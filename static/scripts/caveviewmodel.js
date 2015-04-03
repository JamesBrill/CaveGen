function CaveViewModel()
{
	this.caveName = ko.observable("_");
	this.validatedCaveName = ko.computed(function()
	{
		var text = this.caveName();
		if (text == "")
		{
			return "_";
		}
		var regex = /[^a-zA-Z0-9_]/g;
		var validName = text.replace(regex, "");
		if (validName.length > 20)
		{
			validName = validName.substring(0, 20);
		}
		if (validName.Length < 1)
		{
			validName = "_";
		}
		return validName;
	}, this);
	this.caveWidth = ko.observable(40);
	this.caveHeight = ko.observable(40);
	this.terrainType = ko.observable("1");
	this.waterType = ko.observable("clear");
}

CaveViewModel.prototype.continuePaintingAtMousePosition = function(pixelX, pixelY) 
{
	var gridX = caveGridView.getGridX(pixelX);
	var gridY = caveGridView.getGridY(pixelY);

	if (caveGridView.isMouseDown && grid.withinLimits(gridX, gridY))
	{
		caveGridView.applyBrushAtPosition(currentBrush, gridX, gridY);
	}
}

CaveViewModel.prototype.startPaintingAtMousePosition = function(pixelX, pixelY) 
{
	caveGridView.isMouseDown = true;
	var gridX = caveGridView.getGridX(pixelX);
	var gridY = caveGridView.getGridY(pixelY);
	if (grid.withinLimits(gridX, gridY))
	{
		caveGridView.applyBrushAtPosition(currentBrush, gridX, gridY);
		caveGridView.paintLineMode = true;
	}   
}

CaveViewModel.prototype.finishPainting = function() 
{
	caveGridView.isMouseDown = false;
	caveGridView.paintLineMode = false; 
}

CaveViewModel.prototype.getCaveString = function()
{
	var caveString = "";
	caveString += this.validatedCaveName() + "\n";
	caveString += "terrain " + this.terrainType() + "\n";
	caveString += "background 1\n";
	caveString += "water " + this.waterType() + "\n";

	for (var i = 0; i < this.caveWidth(); i++)
	{
		for (var j = 0; j < this.caveHeight(); j++)
		{
			caveString += grid.getTileAtCoordinates(j, i).symbol;
		}
		caveString += "\n";
	}
	return caveString;
}

CaveViewModel.prototype.getUploadableCaveString = function()
{
	var caveString = this.getCaveString();
	return this.addMissingDoorAndStartingPosition(caveString);
}

CaveViewModel.prototype.addMissingDoorAndStartingPosition = function(caveString)
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