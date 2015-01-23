var width = 40;
var height = 40;
var grid;
var caveGridView;
var paletteViewModel;
var currentBrush;

$(document).ready(function () {  
	var init = function()
	{
		grid = new Cave(width, height);
		caveGridView = new CaveGridView(width, height);
		caveGridView.draw(grid); 
		addEventListeners();
		ko.applyBindings(new PaletteViewModel());
		currentBrush = { fileName: "terrain", symbol: "x" };
	}

	var addEventListeners = function()
	{
		caveGridView.canvas.addEventListener("mousemove", function (event) 
		{
	        var pixelX = event.pageX - this.offsetLeft;
	        var pixelY = event.pageY - this.offsetTop;
	        var gridX = caveGridView.getGridX(pixelX);
	        var gridY = caveGridView.getGridY(pixelY);

            if (caveGridView.isMouseDown)
            {
                caveGridView.applyBrushAtPosition(currentBrush, grid, gridX, gridY);
            }
	    });

		caveGridView.canvas.addEventListener("mousedown", function (event) 
		{
			caveGridView.isMouseDown = true;
	        var pixelX = event.pageX - this.offsetLeft;
	        var pixelY = event.pageY - this.offsetTop;
	        var gridX = caveGridView.getGridX(pixelX);
	        var gridY = caveGridView.getGridY(pixelY);
	        caveGridView.applyBrushAtPosition(currentBrush, grid, gridX, gridY);
	        caveGridView.paintLineMode = true;
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

	init();
});
