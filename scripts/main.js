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
		view.canvas.addEventListener("mousedown", function (event) 
		{
	        var pixelX = event.pageX - this.offsetLeft;
	        var pixelY = event.pageY - this.offsetTop;
	        var gridX = view.getGridX(pixelX);
	        var gridY = view.getGridY(pixelY);
	        grid.setTileAtCoordinates(gridX, gridY, { fileName: "heart", symbol: "l" });
	        view.drawAtGridCoordinates(gridX, gridY, { fileName: "heart", symbol: "l" });

	        if (gridX == 0 && gridY == 0)
	        {
	        	alert(grid.getUploadableCaveString());
	        }
	    });
	}

	init();
});
