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

CaveViewModel.prototype.updateDimensions = function(cave)
{
	if (window.confirm("Are you sure? This will erase all changes."))
	{
		this.validateDimensions(width, height);	
		var width = this.caveWidth();
		var height = this.caveHeight();
		var widthHeightRatio = width / height;
		var border;

		if (widthHeightRatio > 1)
		{
			var displayWidth = CAVE_DISPLAY_SIZE / widthHeightRatio;
			var borderThickness = (CAVE_DISPLAY_SIZE - displayWidth) / 2;
			border = { top: borderThickness, left: 0 };
		}
		else
		{
			var displayHeight = CAVE_DISPLAY_SIZE * widthHeightRatio;
			var borderThickness = (CAVE_DISPLAY_SIZE - displayHeight) / 2;
			border = { top: 0, left: borderThickness };
		}

		var largestDimension = Math.max(width, height);
		var tileSize = CAVE_DISPLAY_SIZE / largestDimension; 	

		grid = (cave == undefined) ? new Cave(width, height) : cave;
		caveView = new CaveView(width, height, tileSize, border);
		caveView.draw(grid); 	
	}
}

CaveViewModel.prototype.validateDimensions = function()
{	
	var validationReport = "";

	if (isNaN(this.caveWidth()))
	{
		this.caveWidth(40);
		validationReport += "Width must be an integer.\n";
	}
	if (isNaN(this.caveHeight()))
	{
		this.caveHeight(40);
		validationReport += "Height must be an integer.\n";
	}

	this.caveWidth(Math.round(this.caveWidth()));
	this.caveHeight(Math.round(this.caveHeight()));

	if (this.caveWidth() < 5)
	{
		this.caveWidth(5);
		validationReport += "Width too small. Must be at least 5.\n";
	}
	if (this.caveHeight() < 5)
	{
		this.caveHeight(5);
		validationReport += "Height too small. Must be at least 5.\n";
	}

	var area = this.caveWidth() * this.caveHeight();
	if (area > 8000)
	{
		this.caveWidth(89);
		this.caveHeight(89);
		validationReport += "Area too large. Must be no more than 8000.\n";
	}
	if (area < 256)
	{
		this.caveWidth(16);
		this.caveHeight(16);
		validationReport += "Area too small. Must be no less than 256.\n";
	}

	if (validationReport != "")
	{
		alert(validationReport);
	}
}

CaveViewModel.prototype.continuePaintingAtMousePosition = function(pixelX, pixelY) 
{
	var gridX = caveView.getGridX(pixelX);
	var gridY = caveView.getGridY(pixelY);

	if (caveView.isMouseDown && grid.withinLimits(gridX, gridY))
	{
		caveView.applyBrushAtPosition(currentBrush, gridX, gridY);
	}
}

CaveViewModel.prototype.startPaintingAtMousePosition = function(pixelX, pixelY) 
{
	caveView.isMouseDown = true;
	var gridX = caveView.getGridX(pixelX);
	var gridY = caveView.getGridY(pixelY);
	if (grid.withinLimits(gridX, gridY))
	{
		caveView.applyBrushAtPosition(currentBrush, gridX, gridY);
		caveView.paintLineMode = true;
	}   

	if (brushSize != lastUsedBrushSize)
	{
		lastUsedBrushSize = brushSize;
		_gaq.push(['_trackEvent', 'Painting', 'Use New Brush Size', this.caveName(), brushSize]);
	}
}

CaveViewModel.prototype.finishPainting = function() 
{
	caveView.isMouseDown = false;
	caveView.paintLineMode = false; 
}

CaveViewModel.prototype.getCaveString = function()
{
	var caveString = "";
	caveString += this.validatedCaveName() + "\n";
	caveString += "terrain " + this.terrainType() + "\n";
	caveString += "background 1\n";
	caveString += "water " + this.waterType() + "\n";

	for (var i = 0; i < this.caveHeight(); i++)
	{
		for (var j = 0; j < this.caveWidth(); j++)
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

CaveViewModel.prototype.generateCave = function()
{
	this.updateDimensions();
	_gaq.push(['_trackEvent', 'Generation', 'Generate Cave', "Width", this.caveWidth()]);
	_gaq.push(['_trackEvent', 'Generation', 'Generate Cave', "Height", this.caveHeight()]);
}

CaveViewModel.prototype.loadCave = function(caveName, caveString)
{
	grid.buildGridFromCaveString(caveString);
	this.caveName(caveName);
	this.caveWidth(grid.width);
	this.caveHeight(grid.height);
	this.updateDimensions(grid);
}