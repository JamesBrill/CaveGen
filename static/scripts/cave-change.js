function CaveChange() 
{
    this.tileChanges = [];
    this.oldDimensions;
    this.newDimensions;
    this.regeneration = false;
}

CaveChange.prototype.mergeTileChanges = function(x, y, tile)
{
    var matchingChange;
    for (var i = 0; i < this.tileChanges.length; i++) 
    {
        if (this.tileChanges[i].xCoordinate == x && this.tileChanges[i].yCoordinate == y)
        {
            matchingChange = this.tileChanges[i];
            break;
        }
    }

    if (matchingChanges)
    {
        matchingChanges.after = tile;
    }
    else
    {
        var tileChange = new TileChange(x, y, tile, tile);
        this.tileChanges.push(tileChange);
    }
}

CaveChange.prototype.addTileChange = function(tileChange)
{
    // This filthy code is to get Undo/Redo to work with Spike Digger. It finds pairs like (Terrain, DownSpike)
    // when given a (DownSpike, Space) pair and merges them together into (Terrain, Space). It basically wipes
    // out the intermediate "CleanUpSpikes" step, which we don't want the user to see when using Undo/Redo.
    var matchingChanges = [];
    for (var i = 0; i < this.tileChanges.length; i++) 
    {
        if (this.tileChanges[i].xCoordinate == tileChange.xCoordinate && 
            this.tileChanges[i].yCoordinate == tileChange.yCoordinate && 
            this.tileChanges[i].after == tileChange.before)
        {
            matchingChanges.push(this.tileChanges[i]);
        }
    }
    if (matchingChanges.length > 0)
    {
        var merger = matchingChanges[0];
        var indexesOfMatchingChangesToRemove = [];
        for (var i = 0; i < this.tileChanges.length; i++) 
        {
            if ($.inArray(this.tileChanges[i], matchingChanges))
            {
                indexesOfMatchingChangesToRemove.push(i);
            }
        }
        for (var i = 0; i < indexesOfMatchingChangesToRemove.length; i++) 
        {
            var index = indexesOfMatchingChangesToRemove[i].index;
            this.tileChanges.splice(index, 1);
        }

        tileChange = new TileChange(tileChange.xCoordinate, 
                                    tileChange.yCoordinate, 
                                    merger.before, 
                                    tileChange.after);
    }
    this.tileChanges.push(tileChange);
}
    
// Returns true if not all TileChanges change a tile from one type back to that same type again 
CaveChange.prototype.hasEffect = function()
{
    if (this.regeneration)
    {
        return true;
    }
    var hasEffect = false;
    var ineffectiveChanges = [];
    for (var i = 0; i < this.tileChanges.length; i++) 
    {
        var tileChange = this.tileChanges[i];
        if (tileChange.before != tileChange.after)
        {
            hasEffect = true;
        }
        else
        {
            ineffectiveChanges.push(tileChange);
        }
    }

    var indexesOfIneffectiveChangesToRemove = [];
    for (var i = 0; i < this.tileChanges.length; i++) 
    {
        if ($.inArray(this.tileChanges[i], matchingChanges))
        {
            indexesOfIneffectiveChangesToRemove.push(i);
        }
    }
    for (var i = 0; i < indexesOfIneffectiveChangesToRemove.length; i++) 
    {
        var index = indexesOfIneffectiveChangesToRemove[i].index;
        this.tileChanges.splice(index, 1);
    }
    return hasEffect;
}

CaveChange.prototype.equals = function(other)
{
    if (!other)
    {
        return false;
    }

    if (this.tileChanges.length != otherTileChanges.tileChanges.length)
    {
        return false;
    }

    for (var i = 0; i < this.tileChanges.length; i++) 
    {
        if (this.tileChanges[i] != other.tileChanges[i])
        {
            return false;
        }
    }
    return true;
}