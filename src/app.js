import "./init.scss";

/** @type {HTMLElement} */
const menu = document.querySelector('.page-header__nav-list');

/** @type {NodeList<HTMLElement>} */
const links = menu.querySelectorAll('.page-header__nav-link');

/** @type {HTMLElement} */
const hamburger = document.querySelector('.page-header__button-hamburger');
const navHeader = document.querySelector('.page-header__logo');

/** @type {NodeList<HTMLElement>} */
const accordionBtns = document.querySelectorAll('.accordion__item-heading');
const accItem = document.querySelectorAll('.accordion__item');

/** @type {Number} */
let navHeight = navHeader.clientHeight;
let windowWidth = window.innerWidth;

/** @type {String} */
let itemClass;

/**
 * Control open menu on resizing the window
 */
function reportWindowSize() {
	navHeight = navHeader.clientHeight;
	windowWidth = window.innerWidth;

	if (windowWidth >= 768 && document.body.classList.contains('modal-body-dark')) {
		document.body.classList.remove('modal-body-dark');
	} else if (windowWidth < 768 && menu.classList.contains('page-header__nav-list--open')) {
		document.body.classList.add('modal-body-dark');
	}
}

window.addEventListener('resize', reportWindowSize);

/**
 * Animation - scroll to Id
 *
 * @function
 */
const animateScroll = (to = 0, duration = 400) => {
	let scrollTop = Math.max(
		window.pageYOffset,
		document.body.scrollTop,
		document.documentElement.scrollTop
	);
	const difference = to - scrollTop;
	const perTick = (difference / duration) * 10;
	requestAnimationFrame(() => {
		scrollTop += perTick;
		document.body.scrollTop = scrollTop;
		document.documentElement.scrollTop = scrollTop;
		if (scrollTop === to) return;
		animateScroll(to, duration - 5);
	});
};

/**
 * Scroll to Id
 */
function activeScroll(event) {
	event.preventDefault();
	const targetId = event.currentTarget.getAttribute('href');
	const targetPosition = document.querySelector(targetId).offsetTop - navHeight;
	animateScroll(targetPosition);
}

/**
 * Hamburger menu
 */
function toogleHamburger() {
	hamburger.classList.toggle('page-header__button-hamburger--close');
	menu.classList.toggle('page-header__nav-list--open');
	document.body.classList.toggle('modal-body-dark');
}

links.forEach((link) => {
	link.addEventListener(
		'click',
		(item) => {
			activeScroll(item);
			if (windowWidth < 1024) toogleHamburger();
		},
		false
	);
});

hamburger.addEventListener('click', toogleHamburger);

/**
 * Accordion
 */
if (accordionBtns) {
	accordionBtns.forEach(item => item.addEventListener('click', toggleItem, false));
}

function toggleItem() {
	itemClass = this.parentNode.className;
	accItem.forEach(item => item.className = 'accordion__item close--js');

	if (itemClass == 'accordion__item close--js') {
		this.parentNode.className = 'accordion__item open--js';
	}
}
