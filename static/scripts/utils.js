var twoDimensionalArray = function(x, y) {
	var grid = new Array(x);
	for (var i = 0; i < x; i++) {
		grid[i] = new Array(y);
	}
	return grid;
}