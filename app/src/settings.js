let jarStartPointsPercent = [0,11,44,82,88,89,91,99]; // 0,11,44,82,88,89,91,99
let jarStopPointsPercent =  [1,15,77,84,98,90,92,100];  //?,15,?,84,98,?,92,100

let increment = 1; //speed of time bar
let delayBeforeShowArc = 0;

//local mode settings
let localModeEnabled = false;
let bypassLocalCheck = false;

const pageScrollDelay = 20000;
const startPage = "setLanguage";
const supportedLanguages = ["en-US", "de","cs","ru","ko","zh"];
const sidepages = ['Moon', 'Sun'];
const libraries = ['Flute','Elements','Navigation','Shadows','MainCavern'];

const languageList = {
    "en-US":"English",
    "de":"Deutsch",
    "cs":"Čeština",
    "ru":"Русский",
    "ko":"한국어",
    "zh":"中文",
    "uz":"O'zbek",
};

const QRCodeTranslation = {
    "01":"Jar1",
    "02":"Jar2",
    "03":"Jar3",
    "04":"Jar4",
    "05":"Jar5",
    "06":"Jar6",
    "07":"Jar7",
    "08":"Jar8",
    "mn":"Moon",
    "sn":"Sun",
    "fl":"Flute",
    "el":"Elements",
    "nv":"Navigation",
    "sh":"Shadows",
    "mc":"MainCavern"
};

function setLocalSettings(){
    let jar = 7;
    // let currentPage = "gameEnd";
    let currentPage = "findJar";
   // let genericPage = "Navigation";
    let genericPage = 8;
    let language = "ru";
    //cookie now: failcount=0; language=en-US; sound=true; gamemode=true; findjar=1; currentpage=libraryJar; genericpageid=Navigation

    //failcount=0; language=en-US; sound=true; gamemode=false; progression=4; currentpage=correctJar //

//language=de; sound=true; gamemode=true; findjar=1; currentpage=findJar; genericpageid=1; failcount=1

    setSetting(SETTING.GAMEMODE, true);
    setSetting(SETTING.SOUND, true);
    setSetting(SETTING.FIND_JAR,jar);
    setSetting(SETTING.CURRENT_PAGE, currentPage);
    setSetting(SETTING.LANGUAGE, language);
    setSetting(SETTING.FAILCOUNT, 0);
    setSetting(SETTING.GENERICPAGEID, genericPage);
    setSetting(SETTING.PROGRESSION,8);

    switchLanguage(language)
    loadPage(currentPage,genericPage);
}

// cookie now: failcount=0; language=en-US; sound=true; gamemode=true; findjar=1; currentpage=findJar; genericpageid=1



// language=en-US; sound=true; gamemode=true; findjar=1; genericpageid=1; failcount=0; progression=2; currentpage=correctJar
