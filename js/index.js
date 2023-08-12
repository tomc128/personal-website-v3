const panel = document.querySelector('#panel');
const mainContent = document.getElementById('main-content');

const siteLoader = document.getElementById('site-loader');

const heroTitle = document.getElementById('hero-title');
const heroImage = document.getElementById('hero-image');
const aboutSection = document.getElementById('about');

const panelSpacers = document.querySelectorAll('#panel .spacer');
const panelFades = document.querySelectorAll('#panel .fade');
const panelContent = document.querySelector('#panel>.content');
const projectCards = document.querySelectorAll('.project-card');


// Update all layout values on page load
calculateSidePadding();
calculateHeroTitleSize();
calculateContentOverlap();

// Fade the site loader out after a short delay
setTimeout(() => {
    siteLoader.classList.add('loaded');
}, 100);

// Scroll events, to update scroll-based animations
mainContent.addEventListener('scroll', calculateHeroTitleSize, { passive: true });
mainContent.addEventListener('scroll', calculateContentOverlap, { passive: true }); // TODO: fix the overlap so content stays same size scrolling from hero -> content?
mainContent.addEventListener('scroll', calculateProjectCardExpansion, { passive: true });

// Resize events, to update layout based on window size
window.addEventListener('resize', calculateSidePadding);
window.addEventListener('resize', calculateContentOverlap);

// Fun message in the console
console.log('%cHey there! 👋🏻', 'font-size: 2rem; font-weight: bold;');



function calculateSidePadding() {
    let width = window.innerWidth;
    const maxWidth = 1200;

    const excess = width - maxWidth;
    const halfExcess = excess / 2;

    const root = document.querySelector(':root');
    root.style.setProperty('--side-padding', `${halfExcess}px`);
}

function calculateContentOverlap() {
    let panelWidth = panel.getBoundingClientRect().width;
    mainContent.style.paddingLeft = `${panelWidth}px`;
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

        // INFO: Ensure that 10rem is updated if the max height of either fade element is bigger
        // fade.style.display = (lerp > 0.999) ? 'none' : 'flex';
        // fade.style.height = (lerp > 0.999) ? '0' : 'auto';
        fade.style.maxHeight = (lerp > 0.999) ? '0' : '10rem';
    });

    // lerp the panelContent gap between 0 when lerp is 1 and 1rem when lerp is 0
    panelContent.style.gap = `${1 - lerp}rem`;


    // fade out hero image
    heroImage.style.opacity = lerp;
}

function calculateProjectCardExpansion(event) {
    let threshold = heroTitle.getBoundingClientRect().top;
    let offsetThreshold = threshold + window.innerHeight / 5 * 3;

    // if were scrolling down, use the top of the card,
    // if were scrolling up, use the bottom of the card
    const isScrollingUp = event.deltaY < 0;

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
