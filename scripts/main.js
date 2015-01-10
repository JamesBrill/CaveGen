$(document).ready(function () {  
	var width = 40;
	var height = 40;
	var grid;
	var view;

	var init = function()
	{
		grid = createGrid(width, height);
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
	        grid[gridY][gridX] = "heart";
	        view.drawAtGridCoordinates(gridX, gridY, "heart");
	    });
	}

	var createGrid = function(x, y)
	{
		var grid = new Array(x);
		for (var i = 0; i < x; i++) {
			grid[i] = new Array(y);
		}
		for (var i = 0; i < x; i++)
		{
			for (var j = 0; j < y; j++)
			{
				grid[i][j] = "terrain";
			}
		}
		return grid;
	}

	init();
});
