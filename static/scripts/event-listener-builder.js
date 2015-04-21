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
		var pixelX = event.pageX - this.offsetLeft;
		var pixelY = event.pageY - this.offsetTop;
		caveViewModel.startPaintingAtMousePosition(pixelX, pixelY);        
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
	$(document).bind('keydown', 'ctrl+z', function() { caveViewModel.undo(); });
	$(document).bind('keydown', 'ctrl+y', function() { caveViewModel.redo(); });
	$(document).bind('keydown', 'shift+g', function() { caveViewModel.generateCave(); });
	$(document).bind('keydown', 'shift+s', function() { caveStorage.storeCave(); });
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