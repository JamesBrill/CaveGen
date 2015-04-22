function SpikePainter() {}

SpikePainter.prototype.getTileFromSpikeDigger = function(row, column)
{
    if (grid.getTileAtCoordinates(column, row - 1].symbol == 'x')
    {
        if (grid.getTileAtCoordinates(column, row + 1) == 'w' && grid.getTileAtCoordinates(column, row + 2) == 'x')
        {
            grid.setTileAtCoordinates(column, row + 1, 'm');
        }
        return 'w';
    }

    if (grid.getTileAtCoordinates(column, row + 1) == 'x')
    {
        return 'm';
    }

    return ' ';
}

SpikePainter.prototype.getTileFromSpikeFiller = function(row, column)
{
    if (grid.getTileAtCoordinates(column, row) != ' ')
    {
        return grid.getTileAtCoordinates(column, row);
    }

    return this.getTileFromSpikeDigger(row, column);
}

SpikePainter.prototype.getTileFromSpikeRemover = function(row, column)
{
    if (grid.getTileAtCoordinates(column, row) != 'w' && grid.getTileAtCoordinates(column, row) != 'm')
    {
        return grid.getTileAtCoordinates(column, row);
    }
    grid.setTileAtCoordinates(column, row, ' ');
    return ' ';
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