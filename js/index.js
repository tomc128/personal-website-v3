let heroTitle;
let aboutSection;
let mainContent;

let panelSpacers;
let panelFades;

let panel;

let projectCards;

console.log(panelSpacers);

// on load
window.addEventListener('load', () => {
    mainContent = document.getElementById('main-content');
    heroTitle = document.getElementById('hero-title');
    aboutSection = document.getElementById('about');
    panelSpacers = document.querySelectorAll('#panel .spacer');
    panelFades = document.querySelectorAll('#panel .fade');
    panel = document.querySelector('#panel');
    projectCards = document.querySelectorAll('.project-card');


    mainContent.addEventListener('scroll', calculateHeroTitleSize, { passive: true });
    // mainContent.addEventListener('scroll',  calculateProjectCardExpansion, { passive: true });

    calculateSidePadding();
    calculateHeroTitleSize();
});

window.addEventListener('resize', calculateSidePadding);


function calculateSidePadding() {
    let width = window.innerWidth;
    const maxWidth = 1200;

    const excess = width - maxWidth;
    const halfExcess = excess / 2;

    const root = document.querySelector(':root');
    root.style.setProperty('--side-padding', `${halfExcess}px`);
}


function calculateHeroTitleSize() {
    let aboutSectionTop = aboutSection.getBoundingClientRect().top;
    let documentHeight = window.innerHeight;

    // lerp between 0 and 1 based on how far down the about section is
    // 0 means end of animation
    // 1 means start of animation
    let lerp = (aboutSectionTop / documentHeight);
    lerp = Math.min(1, Math.max(0, lerp));

    const maxFontSize = 6;
    const minFontSize = 3;

    const maxFontWeight = 700;
    const minFontWeight = 600;

    // set text size based on lerp
    let fontSize = minFontSize + (lerp * (maxFontSize - minFontSize));
    heroTitle.style.fontSize = `${fontSize}rem`;

    // set font weight based on lerp
    let fontWeight = minFontWeight + (lerp * (maxFontWeight - minFontWeight));
    heroTitle.style.fontWeight = fontWeight;

    // for each spacer, set its height to be a lerp between 0 and max height
    const spacerMaxHeight = window.innerHeight / 3;
    panelSpacers.forEach(spacer => {
        let height = (1 - lerp) * spacerMaxHeight;
        spacer.style.height = `${height}px`;
    });

    // for each fade element, set its opacity to be a lerp between 0 and 1
    panelFades.forEach(fade => {
        fade.style.opacity = `${1 - lerp}`;

        // TODO: fix jerk caused by display change
        fade.style.display = (lerp > 0.999) ? 'none' : 'flex';
    });
}

function calculateProjectCardExpansion(offset) {
    let threshold = heroTitle.getBoundingClientRect().top;
    let offsetThreshold = threshold  + window.innerHeight / 5 * 3;

    // if were scrolling down, use the top of the card,
    // if were scrolling up, use the bottom of the card
    const isScrollingUp = offset < 0;

    // expand only the project card which is above titleTop.
    // if none are above, expand the first one
    let closestCard = projectCards[0];
    for (let i = 0; i < projectCards.length; i++) {
        let card = projectCards[i];
        let cardPosition = isScrollingUp
            ? card.getBoundingClientRect().bottom
            : card.getBoundingClientRect().top;

        if (cardPosition < offsetThreshold) {
            closestCard = card;
        }
    }

    // expand the closest card
    projectCards.forEach(card => {
        if (card === closestCard) {
            card.classList.add('expanded');
        } else {
            card.classList.remove('expanded');
        }
    });
}



// Add event listener for mousewheel event on body or left element
document.addEventListener('mousewheel', handleScroll, { passive: false });
// Add event listeners for touch events
document.addEventListener('touchstart', handleTouchStart, { passive: false });
document.addEventListener('touchmove', handleTouchMove, { passive: false });


let lastTouchY = 0;


function handleScroll(event) {
    // Calculate scrolling offset
    const scrollOffset = event.deltaY;

    // Scroll the right element
    mainContent.scrollTop += scrollOffset;

    // Calculate corresponding scroll for the left element based on scrollOffset
    const leftScroll = (panel.scrollHeight / mainContent.scrollHeight) * scrollOffset;
    panel.scrollTop += leftScroll;

    calculateProjectCardExpansion(scrollOffset);

    event.preventDefault();
}

function handleTouchStart(event) {
    lastTouchY = event.touches[0].clientY;
}

function handleTouchMove(event) {
    // Calculate touch scrolling offset
    const touchY = event.touches[0].clientY;
    const scrollOffset = touchY - lastTouchY;

    // Scroll the right element
    mainContent.scrollTop -= scrollOffset;

    // Prevent double scrolling on the right element
    event.preventDefault();

    calculateProjectCardExpansion(-scrollOffset);

    lastTouchY = touchY;
}
