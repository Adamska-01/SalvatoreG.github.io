function loadSpacer(container)
{
	return new Promise((onResolve) =>
	{
		$.get("Pages/spacer.html", function(data)
		{
			var spacer = $(data);
			spacer.appendTo(container);

			onResolve();
		});
	});
}

function scrollToTop(elementId) 
{
    var element = $(`#${elementId}`);

    element.scrollTop(0);
}