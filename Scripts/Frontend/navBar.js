const links = document.querySelectorAll(`.${NAV_LINK_CLASS}`);
const light = document.querySelector(`.${NAV_LIGHT_CLASS}`);
const nav = document.querySelector(`.${NAV_CLASS}`);
let currentActiveElement = null;


function setNavLightVisibility(state) 
{
	light.classList.toggle('visible', state);

	if (!state)
	{
		links.forEach(link => link.classList.remove('active'));
	}
}

function moveLight(activeElement) 
{
	const li = activeElement.closest(`.${NAV_LINK_CLASS}`);
	const { offsetLeft, offsetWidth } = li;
	const lightLeft = offsetLeft + offsetWidth / 2 - light.offsetWidth / 2;

	if (!light.classList.contains('visible')) 
	{
		light.style.transition = 'none';
		light.style.left = `${lightLeft}px`;
		void light.offsetWidth; // <-- force reflow 
		light.style.transition = '';
	}

	const label = activeElement.textContent.trim();
	const colorMap = 
	{
		About: 'var(--about-color)',
		Projects: 'var(--projects-color)',
		Work: 'var(--work-color)',
		Contact: 'var(--contact-color)'
	};
	const activeColor = colorMap[label] ?? 'var(--about-color)';

	light.style.backgroundColor = activeColor;
	light.style.color = activeColor;
	light.style.left = `${lightLeft}px`;
	nav.style.setProperty('--active-color', activeColor);

	setNavLightVisibility(true);
}

function onTabButtonClick(activeElement, action) 
{
	currentActiveElement = activeElement;

	moveLight(activeElement);

	links.forEach(link => link.classList.remove('active'));
	activeElement.closest(`.${NAV_LINK_CLASS}`).classList.add('active');

	action?.();
}


window.addEventListener('resize', () => 
{
	if (currentActiveElement) 
	{
		moveLight(currentActiveElement);
	}
});