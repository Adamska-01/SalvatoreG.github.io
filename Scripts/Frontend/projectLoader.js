let jsYT_APIenabler = "?enablejsapi=1" // This string enables interactions between js and the Youtube API (used to stop the video)

let currentSlide = 0;
let loadingFunctions = [];

let finishedLoad = false;
let finishedTransition = false;


function showItem(tabPageName, linkProjectName)
{
	if (currentProjectPage == linkProjectName) 
		return;

	if (tabPageName == currentTabPage)
	{
		slideToSecondaryContent(onTransitionEnd);
		loadItem(linkProjectName);

		currentProjectPage = linkProjectName;
	}

	currentTabPage = tabPageName;
}

function goBack() 
{
	showList(currentTabPage);
}

function nextMedia(increment)
{
	var arraySize = loadingFunctions.length;
	var newIndex = (currentSlide + increment + arraySize) % arraySize;
	loadingFunctions[newIndex]();
}

function loadItem(linkProjectName)
{
	$(`#${SECONDARY_CONTENT_ID}`).load("Pages/projectDetails.html", function() {
		$.getJSON(`Data/SerializedData/${currentTabPage}/${linkProjectName}.json`, function(json) {
			var title = json.title;
			var videos = json.videos;
			var images = json.images;
			var description = json.description;
			var technologies = json.technologies;
			var linkButtons = json.links;

			// Set project title
			$(`#${PROJECT_TITLE_ID}`).text(title);
			
			var globalIndex = 0;
			var projectLinksDiv = $(`#${PROJECT_LINKS_ID}`);
			
			currentSlide = -1;
			loadingFunctions = [];
			
			// Load videos
			for (var index in videos)
			{
				var videoLink = videos[index].link + jsYT_APIenabler;

				var videoButton = $(`<button/>`)
					.attr('class', 'media-button expand-on-hover background-color-1 text-size-medium')
					.appendTo(projectLinksDiv);

				(function(button, index, videoLink) {
					var number = parseInt(index);
					videoButton.click(function() { 
						loadVideo(button, number, videoLink);
					});
					loadingFunctions.push(function() {
						loadVideo(button, number, videoLink);
					});
				})(videoButton, index, videoLink);

				globalIndex++;
			}

			// Load images
			for (var index in images) 
			{
				var image = images[index];

				var imageButton = $('<button/>')
					.attr('class', 'media-button expand-on-hover background-color-1 text-size-medium')
					.appendTo(projectLinksDiv);
			
				(function(button, globalIndex, image) {
					imageButton.click(function() { 
						loadImage(button, globalIndex, `Images/${currentTabPage}/${linkProjectName}/${image}`);
					});
					loadingFunctions.push(function() {
						loadImage(button, globalIndex, `Images/${currentTabPage}/${linkProjectName}/${image}`);
					});
				})(imageButton, globalIndex, image);

				globalIndex++;
			}

			if ((!videos || videos.length === 0) && (!images || images.length === 0)) 
			{
				$('#image-view').hide();
			} 
			else 
			{
				$('#image-view').show();
			}

			// Load Description
			const container = $(`#${DESCRIPTION_ID}`);
			for (let block of description) 
			{
				if (block.type === "paragraph") 
				{
					$('<span/>')
						.addClass("paragraph")
						.html(block.text)
						.appendTo(container);
				}
				else if (block.type === "list") 
				{
					const ul = $('<ul/>')
						.attr("style", "margin: 0; padding-right:7px; list-style-type: disc;")
						.appendTo(container);
				
					for (let item of block.items) 
					{
						$('<li/>')
							.html(item)
							.appendTo(ul);
					}

					// Add a spacing <div> after the list
					$('<div/>')
						.addClass('small-line-break')
						.appendTo(container);
				}
			}

			// Load technologies
			var contentTechnologyDiv = $(`#${TECHNOLOGIES_ID}`);
			for (var index in technologies) 
			{
				var technology = technologies[index];

				$('<img />')
					.attr('style', 'width: 50px; height: auto; margin: 5px 10px 0px 10px')
					.attr('src', `${SYMBOLS_IMAGE_PATH}/${technology}.png`)
					.attr('alt', technology)
					.attr('title', technology)
					.appendTo(contentTechnologyDiv);
			}
			
			// Button links
			var contentLinks = $(`#${LINKS_ID}`);
			if(linkButtons == null || linkButtons.length <= 0)
			{
				$('<span />')
					.text('No links are currently available.')
					.attr('class', 'paragraph text-color-white text-size-medium')
					.appendTo(contentLinks);
			}
			else
			{
				for (var index in linkButtons)
				{
					var link = linkButtons[index];
					
					$('<a />')
						.attr('class', 'link-button text-color-white text-size-medium')
						.attr('href', link.buttonLink)
						.attr('target', '_blank')
						.text(link.buttonText)
						.appendTo(contentLinks);
				}
			}

			// Load first meadia
			if(loadingFunctions.length > 0)
			{
				loadingFunctions[0]();
			}
		});
	})
}

function onTransitionEnd() 
{

}

function loadImage(button, index, src) 
{
	if (index == currentSlide)
		return;

	var imageShowcase = $(`#${IMAGE_SHOWCASE_ID}`);
	var videoShowcase = $(`#${VIDEO_SHOWCASE_ID}`);

	$('.yt_player_iframe').each(function () {
		this.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*')
	});

	$('.project-image-highlighted').removeClass("project-image-highlighted");

	button.addClass("project-image-highlighted");

	videoShowcase.css("display", "none");

	imageShowcase.css("display", "block");
	imageShowcase.attr("src", src);

	currentSlide = index;
}

function loadVideo(button, index, src) 
{
	if (index == currentSlide)
		return;

	var imageShowcase = $(`#${IMAGE_SHOWCASE_ID}`);
	var videoShowcase = $(`#${VIDEO_SHOWCASE_ID}`);

	$('.project-image-highlighted').removeClass("project-image-highlighted");

	button.addClass("project-image-highlighted");

	imageShowcase.css("display", "none");

	videoShowcase.css("display", "block");
	videoShowcase.attr("src", src);

	currentSlide = index;
}