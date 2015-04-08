function CaveStorage() 
{
	var initialCaveNames = this.loadAllCaveNames();
	this.caveNames = ko.observableArray(initialCaveNames);
	this.selectedCaveName = ko.observable("");
	ko.computed(function()
	{
		var caveName = this.selectedCaveName();
		if (caveName == undefined || caveName == "")
		{
			return;
		}
		var caveString = this.loadCave(caveName);
		ko.ignoreDependencies(caveViewModel.loadCave, caveViewModel, [caveName, caveString]);
		ko.ignoreDependencies(function() 
		{
			_gaq.push(['_trackEvent', 'Storage', 'Load Cave', caveViewModel.caveName(), caveViewModel.caveWidth() * caveViewModel.caveHeight()]);
		}, this, []);	
	}, this);
}

CaveStorage.prototype.loadCave = function(caveName)
{
	return localStorage["cavegen_" + caveName];
}

CaveStorage.prototype.loadAllCaveNames = function()
{
	var caveNames = [];
	for (var i = 0; i < localStorage.length; i++)
	{
		var key = localStorage.key(i);
		if (key.indexOf("cavegen_") == 0)
		{
			caveNames.push(key.substring(8));
		}
	}
	return caveNames;
}

CaveStorage.prototype.storeCave = function() 
{
	var caveName = caveViewModel.caveName();
	var caveString = caveViewModel.getCaveString();
	var addToCaveNameList = false;
	if (localStorage["cavegen_" + caveName] == undefined)
	{
		addToCaveNameList = true;		
	}

	localStorage["cavegen_" + caveName] = caveString;
	_gaq.push(['_trackEvent', 'Storage', 'Save Cave', caveViewModel.caveName(), caveViewModel.caveWidth() * caveViewModel.caveHeight()]);
	
	// The flag seems redundant, but need to make sure storage did not fail before 
	// adding the name to the list
	if (addToCaveNameList)
	{
		this.caveNames.push(caveName);
	}
}