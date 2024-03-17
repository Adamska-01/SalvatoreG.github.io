function showAbout()
{
	showPrimaryPage(ABOUT_TAB_NAME, loadAbout);
}

function showContact()
{
	showPrimaryPage(CONTACT_TAB_NAME, loadContact);
}

function loadAbout(containerID, pageName, cancellationToken)
{
	return loadHTML(containerID, pageName, cancellationToken);
}

function loadContact(containerID, pageName, cancellationToken)
{
	return loadHTML(containerID, pageName, cancellationToken);
}

async function loadHTML(containerID, pageName, cancellationToken) 
{
    return new Promise((resolve, reject) => {
		$(`#${SECONDARY_CONTENT_ID}`).html(""); // Clear secondary content
       
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