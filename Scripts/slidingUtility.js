function slideToPrimaryContent(action) 
{
	changePrimaryContentLeftMargin(action, '0%');

	$(`#${BACK_BUTTON_CONTAINER_ID}`).css("display", "none");
}

function slideToSecondaryContent(action) 
{
	changePrimaryContentLeftMargin(action, '-100%');

	$(`#${BACK_BUTTON_CONTAINER_ID}`).css("display", "block");
}

function changePrimaryContentLeftMargin(action, percentage) 
{
	$(`#${OVERLAY_ID}`).css('display', 'block');
	$(`#${PRIMARY_CONTENT_ID}`).css('marginLeft', percentage);

	if (action != null) 
	{
		$(`#${PRIMARY_CONTENT_ID}`).one("transitionend", function () 
		{
			action();
		});
	}
}

function instantlySlideToMainView() 
{
	setContentMarginLeftTo(0);
}

function instantlySlideToSecondaryView() 
{
	setContentMarginLeftTo(-100);
}

function setContentMarginLeftTo(value) 
{
	var mainContent = $(`#${PRIMARY_CONTENT_ID}`);
	var otherContent = $(`#${SECONDARY_CONTENT_ID}`);

	 // No transition animation until the margin left is at the right value
	 mainContent.addClass("notransition");
	 otherContent.addClass("notransition");
 
	 mainContent.css("marginLeft", value + "%");
 
	 // Force update
	 mainContent.height();
 
	 mainContent.removeClass("notransition");
	 otherContent.removeClass("notransition");
}