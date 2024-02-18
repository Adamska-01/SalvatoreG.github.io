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

async function goBack() 
{
	showList(currentTabPage);
}

function onTransitionEnd() 
{
	finishedTransition = true;

	if (finishedTransition && finishedLoad) {
		//finishLoadingVideo();
	}
}

function loadItem(linkProjectName)
{
	$(`#${SECONDARY_CONTENT_ID}`).load("Pages/projectDetails.html", function() {
		$.getJSON(`Data/SerializedData/${currentTabPage}/${linkProjectName}.json`, function(json) {
			var title = json.title;
			var videos = json.videos;
			var images = json.images;
			var imageFolder = json.imageFolder;
			var descriptions = json.descriptions;
			var technologies = json.technologies;
			var linkButtons = json.links;

			// Set project title
			$(`#${PROJECT_TITLE_ID}`).text(title);
			
			var globalIndex = 0;
			var projectLinksDiv = $(`#${PROJECT_LINKS_ID}`);
			
			currentSlide = 0;
			loadingFunctions = [];
			
			// Load videos
			for (var index in videos)
			{
				var videoLink = videos[index].link;

				var videoButton = $(`<button/>`)
					.attr('class', 'media-button expand-on-hover background-color-1 text-size-medium') // TODO
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
						loadImage(button, globalIndex, imageFolder + image);
					});
					loadingFunctions.push(function() {
						loadImage(button, globalIndex, imageFolder + image);
					});
				})(imageButton, globalIndex, image);

				globalIndex++;
			}

			// Load Description
			var contentDescriptionDiv = $(`#${DESCRIPTION_ID}`);
			for (var index in descriptions) 
			{
				var description = descriptions[index];

				$('<span />')
					.text(description)
					.attr('class', 'paragraph')
					.appendTo(contentDescriptionDiv);
			}

			// Load technologies
			var contentTechnologyDiv = $(`#${TECHNOLOGIES_ID}`);
			for (var index in technologies) 
			{
				var technology = technologies[index];

				$('<img />')
					.attr('style', 'width: 50px; height: auto; margin: 5px 10px 0px 10px')
					.attr('src', `${SYMBOLS_IMAGE_PATH}/${technology}.png`)
					.appendTo(contentTechnologyDiv);
			}

			// Button links
			var contentLinks = $(`#${LINKS_ID}`);
			for (var index in linkButtons)
			{
				var link = linkButtons[index];
				
				$('<button />')
					.attr('class', 'link-button text-color-white text-size-medium')
					.attr("href", link.buttonLink)
					.text(link.buttonText)
					.appendTo(contentLinks);
			}
		});
	})
}

function finishLoadingVideo() 
{
}