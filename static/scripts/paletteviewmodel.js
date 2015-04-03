function PaletteViewModel() 
{
	var self = this;
 
	self.images = ko.observableArray([
		{ fileName: "terrain", symbol: "x" },
		{ fileName: "space", symbol: " " }, 
		{ fileName: "woodencrate", symbol: "b" }, 
		{ fileName: "steelcrate", symbol: "k" }, 
		{ fileName: "treasure", symbol: "+" }, 
		{ fileName: "upspike", symbol: "m" }, 
		{ fileName: "downspike", symbol: "w" }, 
		{ fileName: "dynamite", symbol: "/" }, 
		{ fileName: "steeldynamite", symbol: "|" }, 
		{ fileName: "platform", symbol: "=" }, 
		{ fileName: "boulder", symbol: "o" }, 
		{ fileName: "arrowup", symbol: "^" }, 
		{ fileName: "arrowleft", symbol: "<" }, 
		{ fileName: "arrowdown", symbol: "v" }, 
		{ fileName: "arrowright", symbol: ">" }, 
		{ fileName: "ladder", symbol: "\"" }, 
		{ fileName: "tutorialup", symbol: "n" }, 
		{ fileName: "tutorialleft", symbol: "(" }, 
		{ fileName: "tutorialdown", symbol: "u" }, 
		{ fileName: "tutorialright", symbol: ")" }, 
		{ fileName: "enemy1", symbol: "1" }, 
		{ fileName: "enemy2", symbol: "2" }, 
		{ fileName: "enemy3", symbol: "3" }, 
		{ fileName: "enemy4", symbol: "4" }, 
		{ fileName: "enemy5", symbol: "5" }, 
		{ fileName: "watercrate", symbol: "@" }, 
		{ fileName: "watertap", symbol: "!" }, 
		{ fileName: "waterlevel", symbol: "~" }, 
		{ fileName: "waterstart", symbol: "t" }, 
		{ fileName: "airpocket", symbol: "." }, 
		{ fileName: "secret", symbol: "z" }, 
		{ fileName: "clone", symbol: "c" }, 
		{ fileName: "shockwave", symbol: "0" }, 
		{ fileName: "hannah", symbol: "#" }, 
		{ fileName: "door", symbol: "D" }, 
		{ fileName: "heart", symbol: "l" }, 
		{ fileName: "gem", symbol: "g" }
	]);

	self.size = ko.computed(function()
	{
		var container = $('#palette-container');
		var width = container.width();
		var height = container.height();
		var availableArea = width * height; 
		var numberOfPaletteTiles = self.images().length;
		var availableAreaPerTile = availableArea / numberOfPaletteTiles;
		var largestPossibleTileSize = Math.floor(Math.sqrt(availableAreaPerTile)); 

		var columns = Math.floor(width / largestPossibleTileSize);
		var rows = Math.floor(height / largestPossibleTileSize);
		var possibleTiles = columns * rows;
		if (possibleTiles < numberOfPaletteTiles)
		{
			var excessWidth = width % largestPossibleTileSize;
			largestPossibleTileSize = (width - excessWidth) / (columns + 1);
		}
		return (largestPossibleTileSize - 6) + "px";
	});

	self.imagePath = function(imageName)
	{
		return "images/" + imageName + ".png";
	}

	self.handleClick = function(brush)
	{
		currentBrush = (brush.fileName == "space") ? { fileName: "black", symbol: " " } : brush;
	}
}