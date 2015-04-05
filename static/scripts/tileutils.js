function TileUtils() {}

TileUtils.tileMap = 
[
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
];

TileUtils.getFileNameFromSymbol = function(symbol)
{
	for (var i = 0; i < TileUtils.tileMap.length; i++) 
	{
		if (TileUtils.tileMap[i].symbol == symbol)
		{
			return TileUtils.tileMap[i].fileName;
		}
	}
	console.log("Attempted to get filename from invalid symbol: " + symbol + ".");
}