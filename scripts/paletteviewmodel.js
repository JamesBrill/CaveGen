function PaletteViewModel() {
    var self = this;
 
    self.images = ko.observableArray([
        "terrain", "space", "woodencrate", "steelcrate", "treasure", "upspike", 
        "downspike", "dynamite", "steeldynamite", "platform", "boulder", "arrowup",
        "arrowleft", "arrowdown", "arrowright", "ladder", "tutorialup", "tutorialleft",
        "tutorialdown", "tutorialright", "enemy1", "enemy2", "enemy3", "enemy4", 
        "enemy5", "watercrate", "watertap", "waterlevel", "waterstart", "airpocket",
        "secret", "clone", "shockwave", "hannah", "door", "heart", "gem"
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
        return largestPossibleTileSize + "px";
    });

    self.imagePath = function(imageName)
    {
        return "images/" + imageName + ".png";
    }
}