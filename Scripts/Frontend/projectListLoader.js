function showList(pageName)
{
	showPrimaryPage(pageName, loadProjectList);
}

function showPersonalProjectList()
{
	showPrimaryPage(PERSONAL_PROJECTS_TAB_NAME, loadProjectList);
}

function showWorkProjectList()
{
	showPrimaryPage(WORK_PROJECTS_TAB_NAME, loadProjectList);
}

function loadProjectList(jsonFileName, cancellationToken)
{
	return new Promise((onResolve) => 
	{
		// Clear both primary and secondary content
		$(`#${SECONDARY_CONTENT_ID}`).html(""); 

		var container = $(`#${PRIMARY_CONTENT_ID}`);
		container.html("<div class='very-small-line-break'></div>");
		
		$.getJSON(`Data/SerializedData/${jsonFileName}.json`, async function(json) 
		{
			if (cancellationToken.isCancellationRequested)
				return;

			for(var i = 0; i < json.list.length; i++) 
			{
				if (cancellationToken.isCancellationRequested)
					return;

				addMediumSpacerDiv(container);
				
				var projectGroup = json.list[i];
				await loadOneGroup(container, projectGroup, jsonFileName, cancellationToken);

				addMediumSpacerDiv(container);
			}

			onResolve();
		});
	});
}

async function loadOneGroup(container, projectGroup, jsonFileName, cancellationToken)
{
	await loadProjectTitle(container, projectGroup.title, cancellationToken);
	await loadProjectGroup(container, projectGroup.projects, jsonFileName, cancellationToken);
}

function loadProjectTitle(container, title, cancellationToken)
{
	return new Promise((onResolve, onError) => 
	{
		$.get(`${PROJECT_TITLE_PAGE}`, function(data)
		{
			if(cancellationToken.isCancellationRequested)
			{
				onError(new Error("Load cancelled by cancellation token."));
				return;
			}

			var projectItem = $(data);
			projectItem.text(title);
			projectItem.appendTo(container);

			onResolve();
		});
	});
}

function loadProjectGroup(container, projects, jsonFileName, cancellationToken)
{
	return new Promise(async (onResolve, onError) =>
	{
		var projectContainer = $('<div/>').addClass('list');

		for (var i = 0; i < projects.length; i++) 
		{
			if (cancellationToken.isCancellationRequested)
			{
				onError(new Error("Load cancelled by cancellation token."));
				return;
			}

			var project = projects[i];
			await loadProjectItem(projectContainer, project, jsonFileName, cancellationToken);
		}

		projectContainer.appendTo(container);
		onResolve();
	});
}

function loadProjectItem(container, project, jsonFileName, cancellationToken)
{
	return new Promise((onResolve, onError) =>
	{
		$.get(`${PROJECT_ITEM_PAGE}`, function(data)
		{
			if (cancellationToken.isCancellationRequested)
			{
				onError(new Error("Load cancelled by cancellation token."));
				return;
			}

			var projectItem = $(data);
			projectItem.find(".list-image").attr("src", `Images/${project.image}`);
			projectItem.find(".list-title").text(project.title);
			projectItem.find(".list-date").text(project.date);
			projectItem.find(".list-description").text(project.description);
			projectItem.appendTo(container);

			// Set up click event handler
			(function(link) {
				projectItem.click(function() { 
					showItem(jsonFileName, link);
				});
			})(project.clickLink);

			onResolve();
		});
	});
}