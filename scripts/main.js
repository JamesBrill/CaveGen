$(document).ready(function () {  
	var width = 40;
	var height = 40;
	var grid;
	var view;

	var init = function()
	{
		grid = new Cave(width, height);
		view = new CaveGridView(width, height);
		view.draw(grid); 
		addEventListeners();
	}

	var addEventListeners = function()
	{
		view.canvas.addEventListener("mousemove", function (event) 
		{
	        var pixelX = event.pageX - this.offsetLeft;
	        var pixelY = event.pageY - this.offsetTop;
	        var gridX = view.getGridX(pixelX);
	        var gridY = view.getGridY(pixelY);

            if (view.isMouseDown)
            {
                view.applyBrushAtPosition({ fileName: "heart", symbol: "l" }, grid, gridX, gridY);
            }
	    });

		view.canvas.addEventListener("mousedown", function (event) 
		{
			view.isMouseDown = true;
	        var pixelX = event.pageX - this.offsetLeft;
	        var pixelY = event.pageY - this.offsetTop;
	        var gridX = view.getGridX(pixelX);
	        var gridY = view.getGridY(pixelY);
	        //grid.setTileAtCoordinates(gridX, gridY, { fileName: "heart", symbol: "l" });
	        view.applyBrushAtPosition({ fileName: "heart", symbol: "l" }, grid, gridX, gridY);
	        view.paintLineMode = true;
	    });

		view.canvas.addEventListener("mouseup", function (event) 
		{
			view.isMouseDown = false;
	        view.paintLineMode = false;
	    });
	}

	init();
});
