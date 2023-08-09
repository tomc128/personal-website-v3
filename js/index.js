let heroTitle;
let aboutSection;

// on load
window.addEventListener('load', () => {
    heroTitle = document.getElementById('hero-title');
    aboutSection = document.getElementById('about');

    calculateHeroTitleSize();
});


document.addEventListener('scroll', calculateHeroTitleSize);



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