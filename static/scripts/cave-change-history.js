function CaveChangeHistory() 
{
	this.changes = [];
	this.currentChangeIndex;
}

CaveChangeHistory.prototype.numberOfChanges = function() { return this.changes.length; }

CaveChangeHistory.prototype.lastChange = function() { return this.changes[this.numberOfChanges - 1]; }

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
