function CaveChangeHistory() 
{
	this.changes = [];
	this.currentChangeIndex = -1;
}

CaveChangeHistory.prototype.numberOfChanges = function() { return this.changes.length; }

CaveChangeHistory.prototype.lastChange = function() { return this.changes[this.numberOfChanges - 1]; }

CaveChangeHistory.prototype.currentChange = function() { return this.changes[this.currentChangeIndex]; }

CaveChangeHistory.prototype.getTileChanges = function(index) { return this.changes[index].tileChanges; }

CaveChangeHistory.prototype.isLastChangeARegeneration = function()
{
    if (this.numberOfChanges() == 0)
    {
        return false;
    }
    return this.lastChange().regeneration;
}

CaveChangeHistory.prototype.isUndoingARegeneration = function()
{
    return this.currentChangeIndex >= 0 && this.changes[this.currentChangeIndex].regeneration;
}

CaveChangeHistory.prototype.isRedoingARegeneration = function()
{
    return (this.currentChangeIndex + 1) < this.changes.length && this.changes[this.currentChangeIndex + 1].regeneration;
}

CaveChangeHistory.prototype.cullHistory = function()
{
    if (this.numberOfChanges() > 100)
    {
        var numberOfChangesToRemove = this.numberOfChanges() - 100;
        this.changes.splice(0, numberOfChangesToRemove);
        this.currentChangeIndex -= numberOfChangesToRemove;
    }
}

CaveChangeHistory.prototype.addChange = function(change)
{
	var lastChange = (this.numberOfChanges() > 0) ? this.lastChange() : null;
	// This clause prevents duplicate changes and 'non-changes' from being added to the change history.
	// Duplicate changes occur when duplicate mouse events are fired off rapidly (and erroneously).
	if ((lastChange != null && !lastChange.equals(change) && change.hasEffect()) || lastChange == null)
	{
		this.changes = this.changes.slice(0, this.currentChangeIndex + 1);
	    this.changes.push(change);
	    this.currentChangeIndex++;
	    this.cullHistory();
	}
}
