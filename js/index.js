let heroTitle;
let aboutSection;

// on load
window.addEventListener('load', (event) => {
    heroTitle = document.getElementById('hero-title');
    aboutSection = document.getElementById('about');
});


// Get the position of the top of the about section relative to the screen
// So when its at the top of the screen, its position is 0, and when its
// at the bottom of the screen, its position is the height of the screen

document.addEventListener('scroll', calculateHeroTitleSize);

window.onload = calculateHeroTitleSize;



function calculateHeroTitleSize() {
    let aboutSectionTop = aboutSection.getBoundingClientRect().top;
    let documentHeight = window.innerHeight;

    // lerp between 0 and 1 based on how far down the about section is
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
}