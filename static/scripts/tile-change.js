function TileChange(xCoordinate, yCoordinate, before, after)
{
	this.xCoordinate = xCoordinate;
    this.yCoordinate = yCoordinate;
    this.before = before;
    this.after = after;
}

TileChange.prototype.equals = function(other) 
{
	if (!other)	{ return false;	}

	return this.xCoordinate == other.xCoordinate && this.yCoordinate == other.yCoordinate &&
			this.before == other.before && this.after == other.after;
}