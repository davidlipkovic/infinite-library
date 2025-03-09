
let progressionOutput = document.getElementById("progressionStatus");


var pageLoad = document.getElementById("page");
const numberOfJars = 8;

var lastDecodedText = "";
var localizations = null;
var cameraMode = false;

var audio = null;

const html5QrCode = new Html5Qrcode("reader");
const config = { fps: 10, qrbox: { width: 200, height: 200 } };

var currentLanguage;
//var currentAnimatePoint = 2;

window.onload = (event) => init();

var canvas = document.getElementById('myCanvas');

canvas.width = 300;
canvas.height = 300;
var width = canvas.width,
    height = canvas.height;

// CANVAS PROPERTIES
var ctx = canvas.getContext('2d');
ctx.lineWidth = 5;
ctx.strokeStyle = "#58795E";
// ctx.shadowOffsetX = 0;
// ctx.shadowOffsetY = 0;
// ctx.shadowBlur = 10;
// ctx.shadowColor = '#0f0';

// CANVAS MATHS
var x = width / 2,
    y = height / 2,
    radius = 127,
    circum = Math.PI * 2,
    start = Math.PI / 4, // Start position (top)
    finish = 15, // Finish (in %)
curr = 0; // Current position (in %)


var raf =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;
window.requestAnimationFrame = raf;


function init(){

    console.log('currentLanguage: ' + getSetting(SETTING.LANGUAGE, true));
    if(getSetting(SETTING.LANGUAGE, true) != ""){
        switchLanguage(getSetting(SETTING.LANGUAGE, true), initAfterLanguageLoad);
        addHamburgerLanguages();

        switchOnSwitchMode(typeof getSetting(SETTING.GAMEMODE, true) == "boolean");

    }else
        switchLanguage('en-US', initAfterLanguageLoad);


    var mobile_timer = false;
    var viewport = document.getElementById('viewport');

    if(navigator.userAgent.match(/iPhone/i)) {
        viewport.setAttribute('content','width=device-width,minimum-scale=1.0,maximum-scale=1.0,initial-scale=1.0');
        window.addEventListener('gesturestart',function () {
            clearTimeout(mobile_timer);
            viewport.setAttribute('content','width=device-width,minimum-scale=1.0,maximum-scale=10.0');
        },false);
        window.addEventListener('touchend',function () {
            clearTimeout(mobile_timer);
            mobile_timer = setTimeout(function () {
                viewport.setAttribute('content','width=device-width,minimum-scale=1.0,maximum-scale=1.0,initial-scale=1.0');
            },1000);
        },false);
    }
}

function initAfterLanguageLoad(){

    window.addEventListener("orientationchange", function() {

        var scale = 'scale(1)';
        document.body.style.webkitTransform =  scale;    // Chrome, Opera, Safari
        document.body.style.msTransform =   scale;       // IE 9
        document.body.style.transform = scale;     // General
        document.body.style.zoom = 1.0

        //console.log(window);
        //console.log(window.screen.orientation);
// Announce the new orientation number
//console.log("orientation changed: " + window.matchMedia("(orientation: landscape)").matches);

        let orientationType;

        if (window.screen && window.screen.orientation && window.screen.orientation.type) {
            orientationType = window.screen.orientation.type;
        } else {
            // Fallback logic if window.screen.orientation.type doesn't exist
            // For instance, you can use window.innerWidth and window.innerHeight as a basic fallback
            orientationType = (window.innerHeight > window.innerWidth) ? 'portrait' : 'landscape';
        }

        //switchToLandscape(window.screen.orientation.type.includes('landscape'));
        // switchToLandscape(window.matchMedia("(orientation: landscape)").matches);
        switchToLandscape(orientationType.includes('landscape'));
        //window.location.reload();

//switchToLandscape(window.innerHeight < window.innerWidth);
    }, false);


//switchToLandscape(window.innerHeight < window.innerWidth);
    //switchToLandscape(window.screen.orientation.type.includes('landscape'));
    //switchToLandscape(window.matchMedia("(orientation: landscape)").matches);

    let orientationType;

    if (window.screen && window.screen.orientation && window.screen.orientation.type) {
        orientationType = window.screen.orientation.type;
    } else {
        // Fallback logic if window.screen.orientation.type doesn't exist
        // For instance, you can use window.innerWidth and window.innerHeight as a basic fallback
        orientationType = (window.innerHeight > window.innerWidth) ? 'portrait' : 'landscape';
    }

    switchToLandscape(orientationType.includes('landscape'));

//cookies to see if they already played
    getCookiesAndJump();
}

function getCookiesAndJump(){

    loadSettingsFromCookies();

    let currentPage = getSetting(SETTING.CURRENT_PAGE, true);
    let jarNum = getSetting(SETTING.CURRENT_JAR, true)??1;
    let progression = getSetting(SETTING.PROGRESSION, true);
    let findingJar = getSetting(SETTING.FIND_JAR);
    let gameMode = getSetting(SETTING.GAMEMODE, true);

    let language = getSetting(SETTING.LANGUAGE);

//findingJar = jarNum;
//progression = getProgression();
    for(var x = numberOfJars; x>0; x--){
        if(bit_test(progression, x.toString())){

            jarNum = x;
            break;
        }
    }

//findingJar = getFindJar();


    jarNum = jarNum===""?findingJar:jarNum;
//findingJar = findingJar??1;
// findingJar = progression;
// jarNum = progression;

//loadPage("playIntro");
//loadPage("options");
//toggleScanner(true);

    setSetting(SETTING.FAILCOUNT, 0);

    console.log("currentPage=" + currentPage);
    console.log("jarNum=" + jarNum);
    console.log("findingJar=" + findingJar);
    currentPage = currentPage == null? startPage:currentPage;



    if(localModeEnabled == true && (bypassLocalCheck || document.domain === '127.0.0.1')){

//loadPage(getSetting(SETTING.CURRENT_PAGE), findingJar>jarNum?findingJar:jarNum); //actual first
////////// cookie now: sound=true; gamemode=true; failcount=0; progression=2; findjar=2; currentpage=findJar
      setLocalSettings();

////////
//loadPage(getSetting(SETTING.CURRENT_PAGE), jarNum); //actual first
//loadPage("correctJar",1);
        return;
    }


    console.log('gameMode: ' + gameMode);
    console.log('currentPage: ' + currentPage);
    if(!gameMode && currentPage === 'correctJar')
        loadPage('findJar', 0);
    else
        loadPage(getSetting(SETTING.CURRENT_PAGE), getSetting(SETTING.GENERICPAGEID)); //actual first

// currentJar = 1;
//loadPage("findJar",1);
}


// const navLinks = document.querySelectorAll('.nav-item')
// const menuToggle = document.getElementById('navbarSupportedContent')
// const bsCollapse = new bootstrap.Collapse(menuToggle)
// navLinks.forEach((l) => {
//     l.addEventListener('click', () => { bsCollapse.toggle() })
// })

function revealHamburgerMenu(reveal){
    if(reveal){
        document.getElementById("entireHamburger").style.display = "block";
        document.getElementById("entireHamburger").classList.add("fadeIn");
    }else{
        document.getElementById("entireHamburger").style.display = "none";
    }
}
function highlightPrimaryLanguage(language){
    let items = document.getElementsByClassName("languageItem");
    for (let elementsByClassNameKey in items) {
        //console.log("elementsByClassNameKey" + elementsByClassNameKey + " :: " + items[elementsByClassNameKey].innerText + " :: " + languageList[language])
        //console.log("2" + languageList[language])

        if(items[elementsByClassNameKey].innerText != undefined) {
            if(items[elementsByClassNameKey].innerText === languageList[language] || items[elementsByClassNameKey].innerText === languageList[language].toUpperCase()){

                items[elementsByClassNameKey].classList.add("language-primary");

            if(items[elementsByClassNameKey].classList.contains("language-secondary"))
                items[elementsByClassNameKey].classList.remove("language-secondary");

            }else{
                    items[elementsByClassNameKey].classList.add("language-secondary");

                    if(items[elementsByClassNameKey].classList.contains("language-primary"))
                        items[elementsByClassNameKey].classList.remove("language-primary");

            }
        }

        //decodedText = languageList[decodedText];

    }

}

function onHamburgerClick(language){
    pageTransition();
    switchLanguage(language,processAllLocalizations);
    setSetting(SETTING.LANGUAGE, language);
    //document.getElementById("hamburger").click();
    //(new bootstrap.Collapse(document.getElementById("navbarToggleExternalContent"))).toggle();
    highlightPrimaryLanguage(language);
}
function switchModeHamburger(isGameMode){
    setSetting(SETTING.GAMEMODE, isGameMode);

    if(isGameMode){
        loadPlay();
    }else{
        loadExplore();
        //pageTransition();loadPage("findJar",0);  playSound("foyer");
    }

    (new bootstrap.Collapse(document.getElementById("navbarToggleExternalContent"))).toggle();
}
function hamburgerCollapse(){
    document.getElementById("settingsMode").style.display = "none";
    document.getElementById("page").style.display = "block";
    document.getElementById("camera").style.display = "block";

    //document.getElementById("hamburgerIcon").href = "../assets/images/icons/nobackground/hamburger2.svg";
    document.getElementById("hamburgerIcon").style.backgroundImage = "url('assets/images/icons/nobackground/hamburger2.svg')";
}

function hamburgerExpand(){
    document.getElementById("settingsMode").style.display = "block";
    document.getElementById("page").style.display = "none";
    document.getElementById("camera").style.display = "none";

    //document.getElementById("hamburgerMainBanner").className = 'jar' + jarNumber + "svg";
    document.getElementById("hamburgerIcon").style.backgroundImage = "url('assets/images/icons/nobackground/hamburgerX.svg')";
    //background-image: url("../assets/images/icons/nobackground/hamburger2.svg") !important;
    /*  hamburgerX.svg*/

}
function addHamburgerLanguages(){
    revealHamburgerMenu(true);

    document.getElementById('navbarToggleExternalContent').addEventListener('hide.bs.collapse', hamburgerCollapse);
    document.getElementById('navbarToggleExternalContent').addEventListener('show.bs.collapse', hamburgerExpand);

    document.getElementById("hamburger").onclick = function(){
    };

    document.getElementById("englishHamburger").onclick = function(){onHamburgerClick('en-US')};
    document.getElementById("germanHamburger").onclick = function(){onHamburgerClick('de')};
    document.getElementById("czechHamburger").onclick = function(){onHamburgerClick('cs')};
    document.getElementById("russianHamburger").onclick = function(){onHamburgerClick('ru')};
    document.getElementById("koreanHamburger").onclick = function(){onHamburgerClick('ko')};
    document.getElementById("chineseHamburger").onclick = function(){onHamburgerClick('zh')};
    document.getElementById("uzbekHamburger").onclick = function(){onHamburgerClick('uz')};
}
function switchOnSwitchMode(shouldSwitch){
    document.getElementById("switchModeHamburger").setAttribute("data-langkey",getSetting(SETTING.GAMEMODE, true)?"switchToExplore":"switchToPlay");
    document.getElementById("switchModeHamburger").onclick = function(){switchModeHamburger(!getSetting(SETTING.GAMEMODE, true))};
    document.getElementById("addSwitchHamburger").style.display = shouldSwitch?"block":"none";
}
function switchToLandscape(shouldSwitch){
    console.log("shouldSwitch = " + shouldSwitch);

    document.getElementById("landscapeMode").style.display = shouldSwitch?"block":"none";
    document.getElementById("portraitMode").style.display = shouldSwitch?"none":"block";
    processAllLocalizations();
}
function pageTransition(){
    document.getElementById("page").classList.remove("fadeIn");
    document.getElementById("page").classList.add("fadeIn");
}


function isEmpty(str){
    return (!str || str.length === 0 );
}

function changeTextColor(jarNumber){
    document.body.className="jar" + jarNumber;

    document.getElementById("jarContinue").className = '';
    document.getElementById("jarContinue").classList.add('btn','jar' + jarNumber + "svg");

    document.getElementById("hamburgerAll").className = '';
    document.getElementById("hamburgerAll").classList.add('jar' + jarNumber + "svg", 'navbar', 'navbar-2');
}

function hideSymbol(){
    document.querySelector("#reader video").classList.remove("fadeOut");
    document.getElementById("poolsymbol").classList.remove("fadeIn");
    document.getElementById("poolsymbol").classList.add("opacity-0");
}

async function revealNotFound(shouldReveal){
    if(shouldReveal){
        document.querySelector("#reader video").classList.add("opacity-0");
        document.getElementById("poolsymbol").classList.add("opacity-0");
//document.getElementById("poolsymbol").classList.remove("opacity-0");
    }else{
        if(document.querySelector("#reader video") != null){
            document.querySelector("#reader video").classList.remove("opacity-0");
        }
    }
//
// if(shouldReveal){
//   document.querySelector("#reader video").classList.add("fadeOut")
//   document.getElementById("poolsymbol").classList.add("fadeIn");
//   document.getElementById("poolsymbol").classList.remove("opacity-0");
// }else{
//   if(document.querySelector("#reader video") != null){
//     document.querySelector("#reader video").classList.remove("fadeOut");
//   }
// }

}
async function revealFound(shouldReveal){
// shouldReveal? document.getElementById("poolsymbol").classList.remove("opacity-0"):document.getElementById("poolsymbol").classList.remove("opacity-0");
// shouldReveal? document.getElementById("poolsymbol").classList.add("fadeIn"):document.getElementById("poolsymbol").classList.remove("fadeIn");

    console.log("should reveal: " + shouldReveal);
    if(shouldReveal){
        document.querySelector("#reader video").classList.add("fadeOut")
        document.getElementById("poolsymbol").classList.add("fadeIn");
        document.getElementById("poolsymbol").classList.remove("opacity-0");
    }else{
        if(document.querySelector("#reader video") != null){
            document.querySelector("#reader video").classList.remove("fadeOut");
        }
    }

    document.querySelectorAll(".findJar").forEach(element=>{
        shouldReveal? element.classList.add("fadeOutBlock"):element.classList.remove("fadeOutBlock");
    })
// document.getElementById("next").style.display = shouldReveal? "none":"flex";

    document.querySelectorAll(".foundJar").forEach(element=>{
        element.style.display = shouldReveal? "block":"none";
        shouldReveal? element.classList.add("fadeInBlock"):element.classList.remove("fadeInBlock");
    })

    console.log('shouldReveal2: ' + document.getElementById("next").classList.contains("fadeInFlex"));
    shouldReveal? document.getElementById("next").classList.add("fadeInFlex"):document.getElementById("next").classList.contains("fadeInFlex")? document.getElementById("next").classList.remove("fadeInFlex"):doNothing();
    document.getElementById("next").style.display = shouldReveal? "flex":"none";

   // toggleCameraMode(shouldReveal)
   //
   //  if(shouldReveal){
   //      if(cameraMode) //only if it's on, we stop
   //          html5QrCode.stop();
   //
   //      cameraMode = false;
   //  }


// if(!shouldReveal)
//   document.getElementById("next").classList.add("opacity-0");
//
// await delay(1000);
//
// if(shouldReveal){
//   document.getElementById("next").classList.remove("opacity-0");
// }
}
function doNothing(){}

function toggleCameraMode(toggle, jarNum){

    jarNum = jarNum==null?0:jarNum;
//setCurrentPage(currentPage);

//setSetting(SETTING.CURRENT_PAGE, currentPage, true)
    if(toggle){
        document.getElementById("backImage").style.display = "block";

        //only if it's not already on
        if(!cameraMode){

            Html5Qrcode.getCameras().then(devices => {
                /**
                 * devices would be an array of objects of type:
                 * { id: "id", label: "label" }
                 */
                if (devices && devices.length) {

                    // const cameras = devices.filter(device => device.kind === 'videoinput');
                    const cameras = devices;

                    //if no cameras found
                    if (cameras.length === 0) {
                        return;
                    }

                    let selectedCamera;
                    let backCamera;

                    const wideAngleRegex = /(ultra[ -]?wide|wide[ -]?angle|zoom[ -]?out|facing[ -]?back|back[ -]?camera|rear[ -]?camera|main[ -]?camera|primary[ -]?camera)/i;
                    const backFacingRegex = /(facing[ -]?back|back[ -]?camera|rear[ -]?camera|main[ -]?camera|primary[ -]?camera|0|1)/i;


                    cameras.forEach(camera => {
                        console.log('found camera:', camera.label);

                        const label = camera.label.toLowerCase();
                        // if (label.includes('ultra wide') || label.includes('wide-angle') || label.includes('zoom out')) {
                        //     selectedCamera = camera;
                        // }
                        // if (label.includes('back')) {
                        //     backCamera = camera;
                        // }

                        if (wideAngleRegex.test(label)) {
                            selectedCamera = camera;
                        }

                        if (backFacingRegex.test(label)) {
                            backCamera = camera;
                        }
                    });


                    //look for back camera at least
                    if(!selectedCamera && backCamera)
                        selectedCamera = backCamera;

                    if (!selectedCamera) {
                        html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback);
                        //selectedCamera = cameras[0];
                    }else{
                        console.log('Selected camera:', selectedCamera.label);
                        var cameraId = selectedCamera.id;
                        // .. use this to start scanning.

                        html5QrCode.start(
                            cameraId,
                            config,
                            qrCodeSuccessCallback,
                            (errorMessage) => {
                                // parse error, ignore it.
                            })
                            .catch((err) => {
                                // Start failed, handle it.
                            });
                    }


                }
            }).catch(err => {
                // handle err
            });


            //html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback);
            //html5QrCode.start({ deviceId: "environment" }, config, qrCodeSuccessCallback);
            enableKeyboardEvents(qrCodeSuccessCallback);
        }


        cameraMode = true;
//revealVideo()
        revealFound(false);
        animateWithDelay(jarStartPointsPercent[jarNum - 1], jarStopPointsPercent[jarNum - 1]);
//animateWithDelay(8000,50);


    }else{
        document.getElementById("backImage").style.display = "none";

        //only if it's on, we stop
        if(cameraMode){
            html5QrCode.stop();
            disableKeyboardEvents(qrCodeSuccessCallback);
        }


        cameraMode = false;
    }

    // console.log("Camera is on: " + toggle);
}


//non camera pages
async function loadPage(page, genericPageId){

    console.log("loading page: " + page + " genericPageId: " + genericPageId);


    setSetting(SETTING.CURRENT_PAGE, page);
    if(!isEmpty(genericPageId) && getSetting(SETTING.GAMEMODE))
        setSetting(SETTING.GENERICPAGEID, genericPageId);

    console.log("body opacity 0");
    document.getElementById("body").classList.add('opacity-0');

    if(document.getElementById(page)){
        document.getElementById('page').innerHTML = document.getElementById(page).innerHTML;
        //document.getElementById(page).innerHTML = "";
        loadIndividualPage(null, page, genericPageId);
        return;
    }

    var xhr = typeof XMLHttpRequest != 'undefined' ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('get', 'src/' + page + '.html', true);
    xhr.onloadend = () => {

        if (xhr.readyState === 4 && xhr.status === 200) {
            loadIndividualPage(xhr, page, genericPageId);
        }
    }
    xhr.send();

}

