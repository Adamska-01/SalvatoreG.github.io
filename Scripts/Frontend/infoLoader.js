function showAbout()
{
	showPrimaryPage(ABOUT_TAB_NAME, loadInfo);
}

function showContact()
{
	showPrimaryPage(CONTACT_TAB_NAME, loadInfo);
}

async function loadInfo(pageName, cancellationToken) 
{
	return new Promise((resolve, reject) => 
	{
		// Clear primary and secondary content
		$(`#${SECONDARY_CONTENT_ID}`).html(""); 

		var container = $(`#${PRIMARY_CONTENT_ID}`);
		container.html(""); 
		
		$.get(`Pages/${pageName}.html`, function (data) 
		{
			if (cancellationToken.isCancellationRequested) 
			{
				reject(new Error("Operation cancelled"));
				return;
			}

			$(data).appendTo(container);

			resolve(); 
		})
		.fail(function (error) 
		{
			reject(new Error("Error loading HTML: " + error.statusText));
		});
	});
}