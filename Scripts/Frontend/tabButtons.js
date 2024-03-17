const HIGHLIGHT_CLASS_NAME = "navigation-button-highlighted";


function unhighlightAllTabButtons()
{
	$("." + HIGHLIGHT_CLASS_NAME).removeClass(HIGHLIGHT_CLASS_NAME)
}

function onTabButtonClick(button, action)
{
	unhighlightAllTabButtons()

	$(button).addClass(HIGHLIGHT_CLASS_NAME)

	if (action != null)
	{
		action();
	}
}

