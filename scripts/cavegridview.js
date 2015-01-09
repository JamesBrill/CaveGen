var CaveGridView = function()
{
	this.location = {x:0, y:0};
	this.pixelWidth = 800;
	this.pixelHeight = 500;
	this.width = 80;
	this.height = 50;
	this.tileSize = 10;
	this.canvas = document.getElementById("canvas");
	this.context = canvas.getContext("2d");
}

CaveGridView.prototype.init = function()
{
	for (var i = 0; i < this.width; i++)
	{
		for (var j = 0; j < this.height; j++)
		{
			this.drawAtCoordinates(i * this.tileSize, j * this.tileSize, "terrain");
		}
	}
}

CaveGridView.prototype.drawAtCoordinates = function(x, y, tile)
{
	var image = new Image();
	var context = this.context;
	image.onload = function()
	{
		context.drawImage(image, x, y, 10, 10);
	}
	image.src = "images/" + tile + ".png";
}