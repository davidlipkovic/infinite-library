
var currentJar = -1;
var findingJar = -1;
var currentPage = null;
var progression = 0;
var pageScrollY = 0;
let currentSound = null;

let almostIndex = 1;
const almostIndexes = 2;

var SETTING = {
    CURRENT_JAR: "jar",
    FIND_JAR: "findjar",
    CURRENT_PAGE: "currentpage",
    PROGRESSION: "progression",
    FAILCOUNT: "failcount",
    SOUND  : 'sound',
    GAMEMODE : 'gamemode',
    GENERICPAGEID : 'genericpageid',
    LANGUAGE : 'language',
}


let settings = new Map([
    [SETTING.CURRENT_JAR,-1],
    [SETTING.FIND_JAR,-1],
    [SETTING.CURRENT_PAGE,startPage],
    [SETTING.PROGRESSION,0],
    [SETTING.FAILCOUNT,0],
    [SETTING.SOUND,false],
    [SETTING.GAMEMODE,false]]
    );

/**
 * setSetting
 * @param {SETTING} setting to be set
 * @param {string} value of setting
 * @param {boolean} setCookieValue
 */
function setSetting(setting, value, setCookieValue= true){

    settings.set(setting,value);

    if(setCookieValue)
        setCookie(setting, value.toString(),1);
}

/**
 * getSetting
 * @param {SETTING} setting to be set
 * @param {boolean} fromCookie to be set
 * @return {string} value of setting
 */
function getSetting(setting, fromCookie = false){

    let returnSetting = null;
    if(fromCookie)
        returnSetting = getCookie(setting);
    else
        returnSetting = settings.get(setting);

    //returnSetting = getCookie(setting);

    switch (setting){
        case SETTING.GAMEMODE:
        case SETTING.SOUND:
            return returnSetting !== ""? returnSetting === 'true' || returnSetting === true:"";

        case SETTING.GENERICPAGEID:
        case SETTING.CURRENT_PAGE:
        case SETTING.LANGUAGE:
            return returnSetting;
        default:
            return isNaN(parseInt(returnSetting))?'':parseInt(returnSetting);

    }

}

function loadSettingsFromCookies(){
    console.log(settings);
    let valueFromCookie = "";
    for(let [key, value] of Object.entries(SETTING)){

        valueFromCookie = getSetting(value, true);
         if(valueFromCookie !== ''){
             setSetting(value, valueFromCookie, false);
         }
    }
}

function animateArc(angle){
    ctx.clearRect(width, height, width, height);

    ctx.beginPath();

    ctx.arc(x, y, radius, start, angle, false);

    ctx.stroke();

    curr++;

    if (angle < Math.PI) {
        requestAnimationFrame(function () {
            animateArc(angle + 0.05);
        });
    }
}
// Animate function
async function animate(draw_to) {
    //
    // draw_from_percent = 25;
    // draw_to_percent = 70;
    //console.log('draw_from_percent: ' + draw_from_percent);
    // console.log('start: ' + start);
    // console.log('draw_to_percent: ' + draw_to);
    // let draw_from = (draw_from_percent*(2*Math.PI))/100-(Math.PI/2); //radians
    // let draw_to = ((draw_to_percent*(2*Math.PI))/100)-(Math.PI/2);
    // Clear off the canvas
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, width, height);
    // Start over
    ctx.beginPath();
    // arc(x, y, radius, startAngle, endAngle, anticlockwise)
    // Re-draw from the very beginning each time so there isn't tiny line spaces between each section (the browser paint rendering will probably be smoother too)
    ctx.arc(x, y, radius, start, draw_to, false);
    // Draw
    ctx.stroke();
    // Increment percent
    curr = curr+1;
    // Animate until end

    // console.log('draw_to: ' + draw_to + ' :: ' + curr + ' :: '  + finish);
    if (draw_to < finish + increment) {
        // Recursive repeat this function until the end is reached
        requestAnimationFrame(function () {
            animate(circum * curr/100 + start);
        });
    }

}

function setArc(){
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, width, height);
    // Start over
    ctx.beginPath();
    // arc(x, y, radius, startAngle, endAngle, anticlockwise)
    // Re-draw from the very beginning each time so there isn't tiny line spaces between each section (the browser paint rendering will probably be smoother too)
    ctx.arc(x, y, radius, start, finish, false);
    // Draw
    ctx.stroke();
}
CanvasRenderingContext2D.prototype.clear =
    CanvasRenderingContext2D.prototype.clear || function (preserveTransform) {
        if (preserveTransform) {
            this.save();
            this.setTransform(1, 0, 0, 1, 0, 0);
        }

        this.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (preserveTransform) {
            this.restore();
        }
    };


async function animateWithDelay(startPercentage, endPercentage){

    start = ((startPercentage*(2*Math.PI))/100)-(Math.PI/2);
    // finish = ((endPercentage*(2*Math.PI))/100)-((Math.PI/2))-start;
    finish = ((endPercentage*(2*Math.PI))/100)-((Math.PI/2));
    //
    // curr = 0;
    // ctx.setTransform(1, 0, 0, 1, 0, 0);
    // ctx.clearRect(0, 0, width, height);
    // // Start over
    // ctx.beginPath();
    // // arc(x, y, radius, startAngle, endAngle, anticlockwise)
    // // Re-draw from the very beginning each time so there isn't tiny line spaces between each section (the browser paint rendering will probably be smoother too)
    // ctx.arc(x, y, radius, start, finish, false);
    // // Draw
    // ctx.stroke();
    // return;

    await delay(delayBeforeShowArc);

    setArc(); //no animation for now
    return;
    // animateArc(.01);
    // return;

    curr = 0

    ctx.clear(false);

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, width, height);

    // startPercentage = 44;
    // endPercentage = 47;
    start = ((startPercentage*(2*Math.PI))/100)-(Math.PI/2);
    finish = ((endPercentage*(2*Math.PI))/100)-((Math.PI/2))-start;
    // finish = ((endPercentage*(2*Math.PI))/100)-((Math.PI/2));
    // finish = endPercentage;
    // console.log('start: ' + start);
    // console.log('finish: ' + finish);
    // start = ((startPercentage*(2*Math.PI))/100);
    // finish = ((endPercentage*(2*Math.PI))/100);
    animate(finish);
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

function pauseSound(){

    if(currentSound === 'foyer')
        return;

    if(audio != null){
        audio.pause();
        audio.currentTime = 0;
    }
}
function playSound(soundName, volume = 1.0){

    if(getSetting(SETTING.SOUND, true) === true){

        console.log(soundName + " is true");
        console.log(currentSound + " is currentSound");

        if(soundName === 'foyer' && currentSound === 'foyer')
            return;

        if(audio != null){
            audio.pause();
            audio.currentTime = 0;
        }
        audio = new Audio('assets/audio/' + soundName.toString() + '.mp3');

        if(soundName === 'foyer')
            audio.loop = soundName === 'foyer';

        audio.volume = volume;
        audio.play();

        currentSound = soundName;
    }else{
        console.log(soundName + " not true");
    }
}

function reloadCss(){
    var links = document.getElementsByTagName("link");
    for (var cl in links)
    {
        var link = links[cl];
        if (link.rel === "stylesheet")
            link.href += "";
    }
}

function bit_set(num, bit){
    return num | 1<<bit;
}
function bit_test(num, bit){
    return ((num>>bit) % 2 != 0)
}

async function showFailSequence(findingJar, failCount){
    document.getElementById("hint").classList.add("opacity-0");
    document.getElementById("almost").classList.add("opacity-0");

    await delay(3000);
    document.getElementById("wrongScanText").classList.add("fadeOut");

    await delay(2000);
    //show "see hint below"
    document.getElementById("wrongScanText").classList.remove("fadeOut");
    document.getElementById("wrongScanText").innerHTML = getTranslation("hinthint");
    document.getElementById("wrongScanText").classList.add("fadeIn");

    await delay(2000);
    document.getElementById("hint").innerHTML = getTranslation("findJar" + findingJar.toString() + "_hint" + failCount.toString());
    document.getElementById("almost").innerHTML = getTranslation(getAlmostText());
    document.getElementById("hint").classList.add("fadeIn");
    document.getElementById("almost").classList.add("fadeIn");
    document.getElementById("hint").classList.remove("opacity-0");
    document.getElementById("almost").classList.remove("opacity-0");

    await delay(2000);
    document.getElementById("wrongScanText").classList.remove("fadeIn");
    document.getElementById("wrongScanText").classList.add("opacity-0");

    //await delay(1000);

    //show camera again
    revealNotFound(false);

}
async function pageScrollWithDelay(){
    await delay(pageScrollDelay);
    pageScrollY=0;
    pageScroll("correctJarText");
}

function pageScroll() {

    if(document.getElementById("correctJarText") != null && pageScrollY<250){
        //document.getElementById("correctJarText").scrollBy(0, 10000);
        //document.getElementById("correctJarText").scrollBy(0, document.getElementById("correctJarText").innerHeight);
        document.getElementById("correctJarText").scrollBy(0, 1);
        scrolldelay = setTimeout(pageScroll, 200);
    }
    pageScrollY++;
}

function getAlmostText(){
    almostIndex = almostIndex+1 > almostIndexes?1:almostIndex+1;
    // console.log("almost" + almostIndex);
    return "almost" + almostIndex;
}

function sleep(num) {
    let now = new Date();
    let stop = now.getTime() + num;
    while(true) {
        now = new Date();
        if(now.getTime() > stop) return;
    }
}

// Function to handle keyboard events
function handleKeyEvent(e, callback) {
    console.log(`Key Pressed: ${e.key}`);

    // Call the callback function with the key value
    if (callback) {
        let passedCode = "";
        switch (e.key) {
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
                passedCode = "Jar" + e.key;
                break;
            case "m":
            case "M":
                passedCode = "Moon";
                break;
            case "s":
            case "S":
                passedCode = "Sun";
                break;
            case "f":
            case "F":
                passedCode = "Flute";
                break;
            case "c":
            case "C":
                passedCode = "MainCavern";
                break;
            case "e":
            case "E":
                passedCode = "Elements";
                break;
            case "n":
            case "N":
                passedCode = "Navigation";
                break;
            case "h":
            case "H":
                passedCode = "Shadows";
                break;
        }
        callback(passedCode);
    }
}

// Update the enableKeyboardEvents function to accept a callback parameter
function enableKeyboardEvents(callback) {
    // Pass the callback parameter to handleKeyEvent when adding the event listener
    window.addEventListener('keydown', (e) => handleKeyEvent(e, callback));
    console.log("Keyboard events enabled.");
}

// Update the disableKeyboardEvents function to accept a callback parameter
function disableKeyboardEvents(callback) {
    // Pass the callback parameter to handleKeyEvent when removing the event listener
    window.removeEventListener('keydown', (e) => handleKeyEvent(e, callback));
    console.log("Keyboard events disabled.");
}
