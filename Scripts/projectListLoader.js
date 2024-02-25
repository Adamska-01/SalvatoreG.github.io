function showList(pageName)
{
	showPrimaryPage(pageName, loadProjectList);
}

function showPersonalProjectList()
{
	showPrimaryPage(PERSONAL_PROJECTS_PAGE_NAME, loadProjectList);
}

function showWorkProjectList()
{
	showPrimaryPage(WORK_PROJECTS_PAGE_NAME, loadProjectList);
}

function loadProjectList(containerID, jsonName, cancellationToken)
{
	return new Promise((onResolve) => 
	{
		$(`#${SECONDARY_CONTENT_ID}`).html(""); // Clear secondary content

		var container = $(`#${containerID}`);
		$.getJSON(`Data/SerializedData/${jsonName}.json`, async function(json) 
		{
			if (cancellationToken.isCancellationRequested)
				return;

			container.html("<div class='very-small-line-break'></div>");

			for(var i = 0; i < json.list.length; i++) 
			{
				if (cancellationToken.isCancellationRequested)
					return;

				var projectGroup = json.list[i];
				await loadOneGroup(container, projectGroup, jsonName, cancellationToken);
			}
			
			await loadSpacer(container);

			onResolve();
		});
	});
}

async function loadOneGroup(container, projectGroup, listJSON, cancellationToken)
{
	await loadProjectTitle(container, projectGroup.title, cancellationToken);
	await loadProjectGroup(container, projectGroup.projects, listJSON, cancellationToken);
}

function loadProjectTitle(container, title, cancellationToken)
{
	return new Promise((onResolve, onError) => 
	{
		$.get(`Pages/${PROJECT_TITLE_PAGE_NAME}.html`, function(data)
		{
			if(cancellationToken.isCancellationRequested)
			{
				onError();
				return;
			}

			var projectItem = $(data);
			projectItem.text(title);
			projectItem.appendTo(container);

			onResolve();
		});
	});
}

function loadProjectGroup(container, projects, listJSON, cancellationToken)
{
	return new Promise((onResolve, onError) =>
	{
		$.get(`Pages/${PROJECT_LIST_PAGE_NAME}.html`, async function(data)
		{
			var projectContainer = $(data);
			for(var i = 0; i < projects.length; i++) 
			{
				if (cancellationToken.isCancellationRequested)
				{
					onError();
					return;
				}

				var project = projects[i];
				await loadProjectItem(projectContainer, project, listJSON, cancellationToken);
			}
			
			projectContainer.appendTo(container);

			onResolve();
		});
	});
}

function loadProjectItem(container, project, listJSON, cancellationToken)
{
	return new Promise((onResolve, onError) =>
	{
		$.get(`Pages/${PROJECT_ITEM_PAGE_NAME}.html`, function(data)
		{
			if (cancellationToken.isCancellationRequested)
			{
				onError();
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
					showItem(listJSON, link);
				});
			})(project.clickLink);

			onResolve();
		});
	});
}