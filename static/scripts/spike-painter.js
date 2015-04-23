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