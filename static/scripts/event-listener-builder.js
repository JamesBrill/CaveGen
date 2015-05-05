function EventListenerBuilder() {}

EventListenerBuilder.addMouseEventListeners = function()
{
	caveView.canvas.addEventListener("mousemove", function (event) 
	{
		var pixelX = event.pageX - this.offsetLeft;
		var pixelY = event.pageY - this.offsetTop;
		caveViewModel.continuePaintingAtMousePosition(pixelX, pixelY);
	});

	caveView.canvas.addEventListener("mousedown", function (event) 
	{
		if (!caveView.zoomer.panning)
		{
			var pixelX = event.pageX - this.offsetLeft;
			var pixelY = event.pageY - this.offsetTop;
			caveViewModel.startPaintingAtMousePosition(pixelX, pixelY);     
		}   
	});

	caveView.canvas.addEventListener("mouseup", function (event) 
	{
		caveViewModel.finishPainting();
	});

	caveView.canvas.addEventListener("mouseleave", function (event) 
	{
		caveViewModel.finishPainting();
		caveViewModel.previousCursorSize = caveViewModel.currentCursorSize;
	});
}

EventListenerBuilder.addKeyboardEventListeners = function()
{
	EventListenerBuilder.addCommandKeyBindings();
	EventListenerBuilder.addTileKeyBindings();
}

EventListenerBuilder.addCommandKeyBindings = function()
{	
	$(document).bind('keydown', 'shift+z', function() { caveViewModel.undo(); });
	$(document).bind('keydown', 'shift+y', function() { caveViewModel.redo(); });
	$(document).bind('keydown', 'shift+g', function() { caveViewModel.generateCave(); });
	$(document).bind('keydown', 'shift+s', function() { caveStorage.storeCave(); });	
	$(document).bind('keydown', 'ctrl', function() { caveView.zoomer.enablePanning(); });	
	$(document).bind('keyup', 'ctrl', function() { caveView.zoomer.disablePanning(); });
}

EventListenerBuilder.addTileKeyBindings = function()
{
	$(document).bind('keydown', 's', function() { currentBrush = TileUtils.getTileFromSymbol(' '); });

	$('body').keypress(function(e)
	{
		var keyPressed = String.fromCharCode(e.which);
		if (TileUtils.isTile(keyPressed))
		{
			currentBrush = TileUtils.getTileFromSymbol(keyPressed);
		}
	});	
}