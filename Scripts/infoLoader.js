function showAbout()
{
	showPrimaryPage(ABOUT_PAGE_NAME, loadAbout);
}

function showContact()
{
	showPrimaryPage(CONTACT_PAGE_NAME, loadContact);
}

function loadAbout(containerID, pageName, cancellationToken)
{
	return loadHTML(containerID, pageName, cancellationToken);
}

function loadContact(containerID, pageName, cancellationToken)
{
	return loadHTML(containerID, pageName, cancellationToken);
}

function loadHTML(containerID, pageName, cancellationToken)
{
	var container = $(`#${containerID}`);
	$.get(`Pages/${pageName}.html`, function(data)
	{
		container.html(""); 

		if (cancellationToken.isCancellationRequested)
			return;

		$(data).appendTo(container);
	});
}

async function loadHTML(containerID, pageName, cancellationToken) 
{
    return new Promise((resolve, reject) => {
        var container = $(`#${containerID}`);

        $.get(`Pages/${pageName}.html`, function (data) {
            container.html(""); // Clear div

            if (cancellationToken.isCancellationRequested) {
                reject(new Error("Operation cancelled"));
                return;
            }

            $(data).appendTo(container);

            resolve(); 
        }).fail(function (error) {
            reject(new Error("Error loading HTML: " + error.statusText));
        });
    });
}