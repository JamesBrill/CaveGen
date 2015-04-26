function SpikePainter() {}

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