function addMediumSpacerDiv(container)
{
	// Add spacer
	$('<div/>')
		.addClass('medium-br')
		.appendTo(container);
}

function scrollToTop(elementId) 
{
	var element = $(`#${elementId}`);

	element.scrollTop(0);
}

function stopYoutubeVideos() 
{
	$('.yt_player_iframe').each(function () 
	{
		this.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'stopVideo' }), '*');
	});
}

async function zoomImageIn(imageSource) 
{
	var src = imageSource.src;

	var img = new Image();
	img.src = src;

	await new Promise((resolve) => 
	{
		img.onload = function() 
		{
			$(`#${IMAGE_ZOOM_OVERLAY_ID}`).attr("src", src);
			$(`#${IMAGE_ZOOM_CONTAINER_ID}`).attr('style', 'display: flex;');
			$(`#${IMAGE_ZOOM_OVERLAY_ID}`).attr('style', 'animation: fade-in var(--change-tabPage-time) ease forwards;');
		};
	});
}

function hideZoomImage()
{
	$(`#${IMAGE_ZOOM_CONTAINER_ID}`).css('display', 'none');
}