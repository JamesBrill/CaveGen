var width = 40;
var height = 40;
var grid;
var caveGridView;
var paletteViewModel;
var currentBrush;
var brushSize = 1;;

$(document).ready(function () {  
	var init = function()
	{
		grid = new Cave(width, height);
		caveGridView = new CaveGridView(width, height);
		caveGridView.draw(grid); 
		addEventListeners();
		initCopyToClipboardButton();
		ko.applyBindings(new PaletteViewModel());
		currentBrush = { fileName: "terrain", symbol: "x" };
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

	var addEventListeners = function()
	{
		caveGridView.canvas.addEventListener("mousemove", function (event) 
		{
	        var pixelX = event.pageX - this.offsetLeft;
	        var pixelY = event.pageY - this.offsetTop;
	        var gridX = caveGridView.getGridX(pixelX);
	        var gridY = caveGridView.getGridY(pixelY);

            if (caveGridView.isMouseDown && grid.withinLimits(gridX, gridY))
            {
                caveGridView.applyBrushAtPosition(currentBrush, gridX, gridY);
            }
	    });

		caveGridView.canvas.addEventListener("mousedown", function (event) 
		{
			caveGridView.isMouseDown = true;
	        var pixelX = event.pageX - this.offsetLeft;
	        var pixelY = event.pageY - this.offsetTop;
	        var gridX = caveGridView.getGridX(pixelX);
	        var gridY = caveGridView.getGridY(pixelY);
	        if (grid.withinLimits(gridX, gridY))
	        {
	        	caveGridView.applyBrushAtPosition(currentBrush, gridX, gridY);
	        	caveGridView.paintLineMode = true;
	    	}	        
	    });

		caveGridView.canvas.addEventListener("mouseup", function (event) 
		{
			caveGridView.isMouseDown = false;
	        caveGridView.paintLineMode = false;
	    });

		caveGridView.canvas.addEventListener("mouseleave", function (event) 
		{
			caveGridView.isMouseDown = false;
	        caveGridView.paintLineMode = false;
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

	init();
});