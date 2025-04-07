// P A G E L O A D

// Init Functions on Document Ready
document.addEventListener("DOMContentLoaded", () => {

    init();
    console.log('Document Ready');

});


// I N I T

// Init all functions
function init() {

    console.log('Init all functions');

    // lazy loading
    var lazyLoadInstance = new LazyLoad({
        // Your custom settings go here
    });

    // check if device is mobile
    checkMobile();
}


// F U N C T I O N S


// check if device is mobile
function checkMobile() {

    // check if device is mobile
    function isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    // if mobile
    if (isMobile()) {

        console.log('mobile functions');

        // landingpage skip intro
        if (document.querySelector('#grid')) {

            // delay by 8s
            setTimeout(skipIntro, 4500);
        }

    }

    // if desktop
    if (!isMobile()) {

        console.log('desktop functions');

        // landingpage move background + skip intro
        if (document.querySelector('#grid')) {
            //console.log('landingpage move grid');

            // delay by 4s
            setTimeout(startMoveGrid, 4500);
            setTimeout(skipIntro, 4500);
        }
    }
}


// landingapge: start move background
function startMoveGrid() {
    document.addEventListener('mousemove', moveGrid);
}

// landingpage: processing map function
function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

// landingpage: move background
function moveGrid(e) {

    //set css variable to change speed in css

    //scale factor
    let scale = 1.5;

    //window width & height
    let width = window.innerWidth;
    let height = window.innerHeight;
    //console.log('window width: ' + width + '\n window height: ' + height);

    //mouse position
    let mouseX = e.clientX;
    let mouseY = e.clientY;
    //console.log('X: ' + mouseX + '\nY: ' + mouseY);

    //width & height of grid element
    let grid = document.querySelector('.grid');
    let gridWidth = width * scale;
    let gridHeight = height * scale;
    //console.log('gridWidth: ' + gridWidth + '\n' + 'gridHeight: ' + gridHeight);

    //grid translate position
    let posX = map_range(mouseX, 0, width, (gridWidth - width) / 2, ((gridWidth - width) / 2) * -1);
    let posY = map_range(mouseY, 0, height, (gridHeight - height) / 2, ((gridHeight - height) / 2) * -1);

    //css translation
    let translate = 'translate(' + posX + 'px, ' + posY + 'px) scale(' + scale + ')';

    //apply css translation to grid
    $('.grid').css({
        '-webit-transform': translate,
        '-moz-transform': translate,
        'transform': translate
    });

    //new css translation
    translate = 'translate(' + posX + 'px, ' + posY + 'px) scale(' + scale * 1.1 + ')';

    //apply css translation to bg
    $('.bg').css({
        '-webit-transform': translate,
        '-moz-transform': translate,
        'transform': translate
    });
}


// landingpage: intro listener
//window.addEventListener(('load'), () => {
//    if (document.querySelector('#heading') !== null) {
//        window.sessionStorage.setItem('Heading', 'displayed');
//    }
//})
//
//if (window.sessionStorage.getItem('Heading')) {
//    document.querySelector('#heading').classList.remove('animated')
//}


// C L I C K  F U N C T I O N S

// onclick: skip intro
function skipIntro() {
    document.getElementById("intro").classList.add("skipped");
    document.querySelector(".grid").classList.add("skipped");
    document.querySelector(".bg").classList.add("skipped");
    startMoveGrid();
};

// onclick: open menu
function openMenu() {
    document.querySelector("body").classList.add("active");
    //document.getElementById("menu").classList.add("active");
    //document.getElementById("nav-container").classList.add("active");
};

// onclick: close menu
function closeMenu() {
    document.querySelector("body").classList.remove("active");
    //document.getElementById("menu").classList.remove("active");
    //document.getElementById("nav-container").classList.remove("active");
};

// onclick: open slide
function openSlide() {
    document.getElementById("slide").classList.add("active");
};

// onclick: close slide
function closeSlide() {
    document.getElementById("slide").classList.remove("active");
};
