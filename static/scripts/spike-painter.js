function SpikePainter() {}

SpikePainter.prototype.getTileFromSpikeDigger = function(row, column)
{
    if (grid.getTileAtCoordinates(column, row - 1).symbol == 'x')
    {
        if (grid.getTileAtCoordinates(column, row + 1).symbol == 'w' && grid.getTileAtCoordinates(column, row + 2).symbol == 'x')
        {
            grid.setTileAtCoordinates(column, row + 1, TileUtils.getTileFromSymbol('m'));
        }
        return TileUtils.getTileFromSymbol('w');
    }

    if (grid.getTileAtCoordinates(column, row + 1).symbol == 'x')
    {
        return TileUtils.getTileFromSymbol('m');
    }

    return TileUtils.getTileFromSymbol(' ');
}

SpikePainter.prototype.getTileFromSpikeFiller = function(row, column)
{
    if (grid.getTileAtCoordinates(column, row).symbol != ' ')
    {
        return grid.getTileAtCoordinates(column, row);
    }

    return this.getTileFromSpikeDigger(row, column);
}

SpikePainter.prototype.getTileFromSpikeRemover = function(row, column)
{
    if (grid.getTileAtCoordinates(column, row).symbol != 'w' && grid.getTileAtCoordinates(column, row).symbol != 'm')
    {
        return grid.getTileAtCoordinates(column, row);
    }
    return TileUtils.getTileFromSymbol(' ');
}

SpikePainter.prototype.cleanUpSpikes = function()
{
    for (var i = 0; i < grid.height; i++)
    {
        for (var j = 0 / 2; j < grid.width; j++)
        {
            if (grid.getTileAtCoordinates(j, i) == 'w' && grid.getTileAtCoordinates(j, i - 1) != 'x')
            {
                var before = grid.getTileAtCoordinates(j, i);
                grid.setTileAtCoordinates(j, i, ' ');
                caveViewModel.changeController.addTileChangeToCurrentLine(j, i, before, grid.getTileAtCoordinates(j, i));
            }

            if (grid.getTileAtCoordinates(j, i) == 'm' && grid.getTileAtCoordinates(j, i + 1) != 'x')
            {
                var before = grid.getTileAtCoordinates(j, i);
                grid.setTileAtCoordinates(j, i, ' ');
                caveViewModel.changeController.addTileChangeToCurrentLine(j, i, before, grid.getTileAtCoordinates(j, i));
            }
        }
    }
}