var currentTabPage = "";
var currentProjectPage = "";
var pageLoadingCancellationToken = new Token();


function showPrimaryPage(pageName, loadContentFunction)
{
	if(currentTabPage == pageName && currentProjectPage != "" && currentTabPage != currentProjectPage)
	{
		slideToPrimaryContent();
		currentProjectPage = pageName;
	}
	else
	{
		loadViewPrimaryTab(pageName, loadContentFunction, function() { });
	}

	$(`#${BACK_BUTTON_CONTAINER_ID}`).css("display", "none");

	currentTabPage = pageName;
}

function loadViewPrimaryTab(pageName, loadContentFunction, onAnimationEnd)
{
	pageLoadingCancellationToken.cancel();
	pageLoadingCancellationToken = new Token();
	loadView(pageName, loadContentFunction, onAnimationEnd, instantlySlideToMainView, pageLoadingCancellationToken)
}

function loadViewSecondaryTab(pageName, loadContentFunction, onAnimationEnd)
{
	pageLoadingCancellationToken.cancel();
	pageLoadingCancellationToken = new Token();
	loadView(pageName, loadContentFunction, onAnimationEnd, instantlySlideToSecondaryView, pageLoadingCancellationToken);
}

async function loadView(pageName, loadFunction, onAnimationEnd, switchAction, cancellationToken) 
{
	if (currentProjectPage == pageName)  // Same view -> Hide current view
	{
		setNavLightVisibility(false);

		await fadeOutContent();

		currentTabPage = "";
		currentProjectPage = "";
	}
	else // Different view -> fade out old content -> fade in new content
	{
		currentProjectPage = pageName;
		await fadeOutContent();
		await loadFunction(pageName, cancellationToken);
		switchAction();
		await fadeInContent();
		onAnimationEnd();
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
	currentProjectPage = "";

	stopYoutubeVideos()

	setNavLightVisibility(false);
}