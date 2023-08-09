let heroTitle;
let aboutSection;
let mainContent;

let panelSpacers;

console.log(panelSpacers);

// on load
window.addEventListener('load', () => {
    mainContent = document.getElementById('main-content');
    heroTitle = document.getElementById('hero-title');
    aboutSection = document.getElementById('about');
    panelSpacers = document.querySelectorAll('#panel .spacer');

    mainContent.addEventListener('scroll', calculateHeroTitleSize, {passive: true});
    
    calculateSidePadding();
    calculateHeroTitleSize();
});

window.addEventListener('resize', calculateSidePadding);


function calculateSidePadding() {
    let width = window.innerWidth;
    const maxWidth = 1200;

    console.log(width);

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
}