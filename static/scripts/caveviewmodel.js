function CaveViewModel()
{
	var self = this;

	self.caveName = ko.observable("_");
	self.caveWidth = ko.observable(40);
	self.caveHeight = ko.observable(40);
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