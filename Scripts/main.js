const OVERLAY_ID = "overlay";
const CONTENT_CONTAINER_ID = "content-container";
const PRIMARY_CONTENT_ID = "content-primary";
const SECONDARY_CONTENT_ID = "content-secondary";
const ABOUT_PAGE_NAME = "about";
const CONTACT_PAGE_NAME = "contact";
const PROJECT_TITLE_PAGE_NAME = "projectTitle";
const PROJECT_LIST_PAGE_NAME = "projectList";
const PROJECT_ITEM_PAGE_NAME = "projectItem";
const PERSONAL_PROJECTS_JSON_NAME = "PersonalProjects";
const WORK_PROJECTS_JSON_NAME = "WorkProjects";


var currentTabPage = "";
var pageLoadingCancellationToken = new Token();


// Hide the content container at startup
$(document).ready(function() {
	$(`#${CONTENT_CONTAINER_ID}`).css("display", "none").css("opacity", "0");
});


function showPrimaryPage(pageName, loadContentFunction)
{
	if(currentTabPage == pageName)
	{
		// TODO: slide to the primary content when the slide is implemented 
	}
	else
	{
	}
	loadViewPrimaryTab(pageName, loadContentFunction);
}

function loadViewPrimaryTab(pageName, loadContentFunction)
{
	pageLoadingCancellationToken.cancel();
	pageLoadingCancellationToken = new Token();
	loadView(pageName, loadContentFunction, PRIMARY_CONTENT_ID, pageLoadingCancellationToken)
}

function loadViewSecondaryTab(pageName, loadContentFunction)
{
	
}

async function loadView(pageName, loadFunction, containerID, cancellationToken) 
{
	if (currentTabPage == pageName) 
	{
		unhighlightAllTabButtons();
		await fadeOutContent();
		currentTabPage = "";
	} 
	else 
	{
		currentTabPage = pageName;
		await fadeOutContent();
		await loadFunction(containerID, pageName, cancellationToken);
		await fadeInContent();
	}
}

function fadeInContent() 
{
    $(`#${OVERLAY_ID}`).css('display', 'block');

    var content = $(`#${CONTENT_CONTAINER_ID}`);

	content.css("display", "block");

	// The scroll needs to be done after setting the display from 'none' to 'block'
	content.one("animationstart", function (event) {
		scrollToTop(PRIMARY_CONTENT_ID);
		scrollToTop(SECONDARY_CONTENT_ID);
    });

	content.removeClass('fade-out-anim').addClass('fade-in-anim');

    return new Promise((resolve) => {
        content.one("animationend", function (event) {          
			resolve();
        });
    });
}

function fadeOutContent() 
{
    $(`#${OVERLAY_ID}`).css('display', 'none');

    var content = $(`#${CONTENT_CONTAINER_ID}`);
    if (parseFloat(content.css('opacity')) > 0) 
	{
		content.removeClass('fade-in-anim').addClass('fade-out-anim');

        return new Promise((resolve) => {
            content.one("animationend", function (event) {
                content.css('display', 'none');
                resolve();
            });
        });
    }
}

async function hideContent()
{
	await fadeOutContent();

	currentTabPage = "";

	unhighlightAllTabButtons();
}