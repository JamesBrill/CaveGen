var width = 40;
var height = 40;
var grid;
var caveGridView;
var caveViewModel;
var currentBrush;
var brushSize = 1;

$(document).ready(function () {  
	var init = function()
	{
		grid = new Cave(width, height);
		caveGridView = new CaveGridView(width, height);
		caveGridView.draw(grid); 
		caveViewModel = new CaveViewModel();
		addEventListeners();
		initCopyToClipboardButton();
		ko.applyBindings(new PaletteViewModel(), $('#palette-container')[0]);
		ko.applyBindings(caveViewModel, $('#cave-settings')[0]);
		currentBrush = { fileName: "terrain", symbol: "x" };
		initBrushSizeSlider();
	}

	var addEventListeners = function()
	{
		caveGridView.canvas.addEventListener("mousemove", function (event) 
		{
			var pixelX = event.pageX - this.offsetLeft;
			var pixelY = event.pageY - this.offsetTop;
			caveViewModel.continuePaintingAtMousePosition(pixelX, pixelY);
		});

		caveGridView.canvas.addEventListener("mousedown", function (event) 
		{
			var pixelX = event.pageX - this.offsetLeft;
			var pixelY = event.pageY - this.offsetTop;
			caveViewModel.startPaintingAtMousePosition(pixelX, pixelY);        
		});

		caveGridView.canvas.addEventListener("mouseup", function (event) 
		{
			caveViewModel.finishPainting();
		});

		caveGridView.canvas.addEventListener("mouseleave", function (event) 
		{
			caveViewModel.finishPainting();
		});
	}

	var initCopyToClipboardButton = function()
	{
		var client = new ZeroClipboard($('#copyToClipboard'));
		client.on('ready', function(event) 
		{
			client.on('copy', function(event) 
			{
				var caveText = grid.getUploadableCaveString();
				event.clipboardData.setData('text/plain', caveText);
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