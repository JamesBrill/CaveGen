var width = 40;
var height = 40;
var grid;
var caveView;
var caveViewModel;
var caveStorage;
var currentBrush;
var brushSize = 1;
var lastUsedBrushSize = 0;
var CAVE_DISPLAY_SIZE = 800;
var client;

$(document).ready(function () 
{  
	var init = function()
	{
		grid = new Cave(width, height);
		caveView = new CaveView(width, height, 20);
		caveView.draw(grid); 
		caveViewModel = new CaveViewModel();
		caveStorage = new CaveStorage();
		addMouseEventListeners();
		addKeyboardEventListeners();
		initCopyToClipboardButton();
		ko.applyBindings(new PaletteViewModel(), $('#palette-container')[0]);
		ko.applyBindings(caveViewModel, $('#cave-settings')[0]);
		ko.applyBindings(caveStorage, $('#cave-storage')[0]);
		currentBrush = { fileName: "terrain", symbol: "x" };
		initBrushSizeSlider();
	}

	var addMouseEventListeners = function()
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

	var addKeyboardEventListeners = function()
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

	var initCopyToClipboardButton = function()
	{
		var client = new ZeroClipboard($('#copyToClipboard'));
		client.on('ready', function(event) 
		{
			client.on('copy', function(event) 
			{
				var caveText = caveViewModel.getUploadableCaveString();
				event.clipboardData.setData('text/plain', caveText);
				_gaq.push(['_trackEvent', 'Copying', 'Copy To Clipboard', caveViewModel.caveName(), 
							caveViewModel.caveWidth() * caveViewModel.caveHeight()]);
			});
		});

		client.on( 'error', function(event) 
		{
			ZeroClipboard.destroy();
		});
	}

	var initBrushSizeSlider = function()
	{
		$("#brushSizeSlider").slider({
			value:1,
			min: 1,
			max: 6,
			step: 1,
			width: 100,
			slide: function( event, ui ) 
			{
				$("#brushSize").val(ui.value);
				brushSize = ui.value;
			}
		});
		$("#brushSize").val($("#brushSizeSlider").slider("value"));
	}

	init();
});