function CaveChangeHistory() 
{
	this.changes = [];
	this.currentChangeIndex = -1;
}

CaveChangeHistory.prototype.numberOfChanges = function() { return this.changes.length; }

CaveChangeHistory.prototype.currentChange = function() { return this.changes[this.currentChangeIndex]; }

CaveChangeHistory.prototype.rollBackCurrentChange = function() 
{ 
    this.currentChangeIndex = Math.max(0, this.currentChangeIndex - 1); 
}

CaveChangeHistory.prototype.rollForwardCurrentChange = function() 
{ 
    this.currentChangeIndex = Math.min(this.changes.length - 1, this.currentChangeIndex + 1); 
}

CaveChangeHistory.prototype.getTileChanges = function(index) { return this.changes[index].tileChanges; }

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
	var currentChange = (this.numberOfChanges() > 0) ? this.currentChange() : null;
	// This clause prevents duplicate changes and 'non-changes' from being added to the change history.
	// Duplicate changes occur when duplicate mouse events are fired off rapidly (and erroneously).
	if ((currentChange != null && !currentChange.equals(change) && change.hasEffect()) || currentChange == null)
	{
		this.changes = this.changes.slice(0, this.currentChangeIndex + 1);
	    this.changes.push(change);
	    this.currentChangeIndex++;
	    this.cullHistory();
	}
}