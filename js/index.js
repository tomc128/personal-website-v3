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

document.addEventListener('scroll', (event) => {
    let aboutSectionTop = aboutSection.getBoundingClientRect().top;
    let documentHeight = window.innerHeight;

    console.log(aboutSectionTop);
    console.log(documentHeight);
    
    // aboutSectionTop = 0 => about section is fully in view

    // lerp between 0 and 1 based on how far down the about section is
    let lerp = (aboutSectionTop / documentHeight);
    // clamp lerp between 0 and 1
    lerp = Math.min(1, Math.max(0, lerp));
    console.log(lerp);


    // set text size based on lerp, from 3rem to 6rem
    let fontSize = 3 + (lerp * 3);
    heroTitle.style.fontSize = `${fontSize}rem`;



});