
async function loadIndividualPage(xhr, page, genericPageId){

    if(xhr !== null)
        pageLoad.innerHTML = xhr.responseText;


    if(page !== "correctJar"){
        playSound("foyer");
    }

    if(page === "correctJar"){//if correct jar, swap out classes and text for what is needed

        changeTextColor(genericPageId);

        //determine if it's a jar (progression) or side jar
        let textMode = getSetting(SETTING.GAMEMODE) === true && !sidepages.includes(genericPageId) && !libraries.includes(genericPageId)? "correct":"found";

        document.getElementById("correctJarImage").src = "assets/images/symbols/" + genericPageId + ".svg";
        document.getElementById("correctJar_header").setAttribute("data-langkey", textMode + "Jar" + genericPageId + "_header");
        document.getElementById("correctJarText").setAttribute("data-langkey", "correctJar" + genericPageId + "_text");

//console.log("scrolling? " + document.getElementById("correctJarText"));

        //libraries don't scroll
        if(!libraries.includes(genericPageId) && getSetting(SETTING.LANGUAGE, true) === 'en-US')
            pageScrollWithDelay();

        document.getElementById("jarContinue").onclick = function(){
            pageTransition();
            pauseSound();

            if(getSetting(SETTING.GAMEMODE)){
                let findingJar = getSetting(SETTING.FIND_JAR);

//must not be side page if we increment
                if(!sidepages.includes(genericPageId) && !libraries.includes(genericPageId))
                    findingJar = parseInt(findingJar)+1;

                if(parseInt(findingJar) > numberOfJars){
//they're at end
                    loadPage("gameEnd");
                }else{
                    setSetting(SETTING.FIND_JAR, findingJar);
                    console.log("findingJar: " + findingJar);
                    loadPage("findJar", findingJar);
                }
            }else{
                loadPage("findJar", 0);
            }

        };

    }else if(page === "libraryJar") {

        toggleCameraMode(false, null);

        //document.getElementById("correctJarImage").src = "assets/images/symbols/" + genericPageId + ".svg";
        document.getElementById("correctJar_header").setAttribute("data-langkey", "correctJar" + genericPageId + "_header");
        document.getElementById("correctJarText").setAttribute("data-langkey", "correctJar" + genericPageId + "_text");


        document.getElementById("jarContinue").onclick = function(){

            document.getElementById("moonring").style.display = null;
            document.getElementById("timeCircle").style.display = null;

            pageTransition();
            //pauseSound();

            if(getSetting(SETTING.GAMEMODE)){
                loadPage("findJar", getSetting(SETTING.FIND_JAR) === -1?1:getSetting(SETTING.FIND_JAR));
            }else{
                loadPage("findJar", 0);
            }

        };
    }else if(page === "findJar") {
        console.log("genericPageId: " + genericPageId);
        if(isEmpty(genericPageId))
            genericPageId = 0;

        toggleCameraMode(true, genericPageId);
//swap out texts and ring
        document.getElementById("moonring").src = "assets/images/cameraRing/" + genericPageId + ".svg";
        document.getElementById("findJarBefore").setAttribute("data-langkey", "findJar" + genericPageId + "TextBefore");
        document.getElementById("findJarMiddle").setAttribute("data-langkey", "findJar" + genericPageId + "TextMiddle");
        document.getElementById("findJarAfter").setAttribute("data-langkey", "findJar" + genericPageId + "TextAfter");

        console.log('GameMode: ' + getSetting(SETTING.GAMEMODE));
        console.log('FailCount: ' + getSetting(SETTING.FAILCOUNT));
        if(getSetting(SETTING.GAMEMODE) && getSetting(SETTING.FAILCOUNT) > 0){
            document.getElementById("wrongScanText").classList.add('opacity-0');
            document.getElementById("almost").classList.remove('opacity-0');
            document.getElementById("hint").classList.remove('opacity-0');
            document.getElementById("almost").innerHTML = getTranslation(getAlmostText());

            document.getElementById("hint").setAttribute("data-langkey", "findJar" + getSetting(SETTING.FIND_JAR) + "_hint" + getSetting(SETTING.FAILCOUNT));
            //document.getElementById("hint").innerHTML = getTranslation("findJar" + getSetting(SETTING.FIND_JAR) + "_hint" + getSetting(SETTING.FAILCOUNT));
        }else if(!getSetting(SETTING.GAMEMODE)){
            console.log("PROGRESSION:" + getSetting(SETTING.PROGRESSION));
            if(getSetting(SETTING.PROGRESSION, true) > 0){
                document.getElementById("findJarBefore").classList.add('opacity-0');
                document.getElementById("findJarMiddle").classList.add('opacity-0');
            }else{
                document.getElementById("findJarBefore").classList.remove('opacity-0');
                document.getElementById("findJarMiddle").classList.remove('opacity-0');
            }
        }else{
        }


//setSetting(SETTING.FIND_JAR, findingJar);
//loadPage("findJar", genericPageId);
    }else if(page === "failScreen"){
        var gameFailScreen = getSetting(SETTING.FAILCOUNT)>=5?2:1;
        document.getElementById("gameFail").setAttribute("data-langkey", "gamefail" + gameFailScreen + "_text");

        document.getElementById("play").onclick = function(){pageTransition(); loadPage("findJar", genericPageId);};
        document.getElementById("explore").onclick = loadExplore;
        toggleCameraMode(false);
    }else{
        switch(page){

            case "setLanguage":
                document.getElementById("english").onclick = function(){
                    pageTransition();
                    switchLanguage('en-US', function(){addHamburgerLanguages(); loadPage("headphones")});
                    setSetting(SETTING.LANGUAGE, 'en-US');
                };
                document.getElementById("german").onclick = function(){
                    setSetting(SETTING.LANGUAGE, 'de');
                    pageTransition();
                    switchLanguage('de',  function(){addHamburgerLanguages(); loadPage("headphones")});
                };
                document.getElementById("czech").onclick = function(){
                    setSetting(SETTING.LANGUAGE, 'cs');
                    pageTransition();
                    switchLanguage('cs',  function(){addHamburgerLanguages(); loadPage("headphones")});
                };
                document.getElementById("russian").onclick = function(){
                    setSetting(SETTING.LANGUAGE, 'ru');
                    pageTransition();
                    switchLanguage('ru',  function(){addHamburgerLanguages(); loadPage("headphones")});
                };
                document.getElementById("korean").onclick = function(){
                    setSetting(SETTING.LANGUAGE, 'ko');
                    pageTransition();
                    switchLanguage('ko',  function(){addHamburgerLanguages(); loadPage("headphones")});
                };
                document.getElementById("chinese").onclick = function(){
                    setSetting(SETTING.LANGUAGE, 'zh');
                    pageTransition();
                    switchLanguage('zh',  function(){addHamburgerLanguages(); loadPage("headphones")});
                };
                document.getElementById("uzbek").onclick = function(){
                    setSetting(SETTING.LANGUAGE, 'uz');
                    pageTransition();
                    switchLanguage('uz',  function(){addHamburgerLanguages(); loadPage("headphones")});
                };
                document.getElementById("kazakh").onclick = function(){
                    setSetting(SETTING.LANGUAGE, 'kz');
                    pageTransition();
                    switchLanguage('kz',  function(){addHamburgerLanguages(); loadPage("headphones")});
                };
                break;
            case "headphones":
                //processAllLocalizations();
                document.getElementById("headphones_yes").onclick = function(){
                    setSetting(SETTING.SOUND, true);
                    pageTransition();
                    loadPage("cameraEnable");
                };
                document.getElementById("headphones_no").onclick = function(){
                    pageTransition();
                    setSetting(SETTING.SOUND, false);
                    loadPage("cameraEnable");
                };
                break;

            case "cameraEnable":
                console.log("Sound enabled: " + getSetting(SETTING.SOUND));
                //processAllLocalizations();
                    document.getElementById("startCameraCheck").onclick = function(){
                        pageTransition();
                        loadPage("options"); //toggleScanner(true);
                    };
                break;

            case "options":
                toggleCameraMode(false);
                document.getElementById("play").onclick     = loadPlay;
                document.getElementById("explore").onclick  = loadExplore;
                break;

            case "playIntro":
                document.getElementById("hamburgerAll").className = "jar1svg navbar navbar-2";
                document.getElementById("body").className = "jar1";
                //document.getElementById("body").classList.add("jar1svg");

                toggleCameraMode(false);
                document.getElementById("jarContinue").onclick = function(){pageTransition(); setSetting(SETTING.FIND_JAR, 1); loadPage("findJar",1);};
                break;

            case "gameEnd":
                // console.log("THE END :)");
                document.body.className="gameEnd";
                document.getElementById("explore").onclick = loadExplore;
                break;


            default:
                break;
        }
    }

//last thing, localizations
    processAllLocalizations();
    await(2000);
    document.getElementById("body").classList.remove('opacity-0');
}

function loadPlay(){
    switchOnSwitchMode(true);
    pageTransition();setSetting(SETTING.GAMEMODE, true); loadPage("playIntro");  playSound("foyer");

}
function loadExplore(){

    switchOnSwitchMode(true);

    if(!document.getElementById("wrongScanText").classList.contains("opacity-0"))
        document.getElementById("wrongScanText").classList.add("opacity-0");

    pageTransition();setSetting(SETTING.GAMEMODE, false); loadPage("findJar",0);  playSound("foyer");
}
const qrCodeSuccessCallback = (decodedText, decodedResult) => {
    /* handle success */

   if(QRCodeTranslation[decodedText] != null)
        decodedText = QRCodeTranslation[decodedText];

    console.log("decodedResult transformed: " + decodedText);
    // console.log(`Scan result: ${decodedText}`, decodedResult);
    switch(getSetting(SETTING.CURRENT_PAGE)){

        case "findJar":

            let findingJar = parseInt(getSetting(SETTING.FIND_JAR));
            changeTextColor(findingJar);

            // console.log("findJar" + findingJar);
            // console.log("gameMode: " + getSetting(SETTING.GAMEMODE));


            let sidePage = sidepages.includes(decodedText) || libraries.includes(decodedText);
            let libraryPage = libraries.includes(decodedText);


            if(libraryPage){
                document.getElementById("moonring").style.display = "none";
                document.getElementById("timeCircle").style.display = "none";
            }

            console.log("sidePage: " + sidePage);
            console.log("1: " + !getSetting(SETTING.GAMEMODE));
            console.log("2: " + ("Jar" + findingJar));

            //did they scan the right one?
            if(getSetting(SETTING.GAMEMODE) === false || ("Jar" + findingJar) === decodedText || sidePage){

                console.log(getSetting(SETTING.GAMEMODE) === false);
                console.log(("Jar" + findingJar) === decodedText);
                console.log(sidePage);
                cameraMode = false;
                let jar = '';

                if(decodedText.substr(0,3) === "Jar")
                    jar = decodedText.substr(3);
                else
                    jar = decodedText;

                setSetting(SETTING.FAILCOUNT, 0);
                if(!sidePage && getSetting(SETTING.GAMEMODE))
                    setSetting(SETTING.PROGRESSION, bit_set(getSetting(SETTING.PROGRESSION), jar));

                console.log("decodedText: " + decodedText);

                if(getSetting(SETTING.GAMEMODE) === true && lastDecodedText === decodedText) //probably a rescan, ignore
                    break;


                console.log("show Jar " +  jar + " page");
                // if(decodedText === "Flute"){
                //     //document.getElementById("poolsymbol").classList.add("flute");
                //     document.getElementById("poolsymbol").src = "assets/images/symbols/flute.jpg";
                // }else{
                //     document.getElementById("poolsymbol").src = "assets/images/symbols/" + jar + ".svg";
                // }

                document.getElementById("poolsymbol").src = "assets/images/symbols/" + jar + ".svg";


                let textMode = getSetting(SETTING.GAMEMODE) === true && !sidePage? "correct":"found";

                document.getElementById("foundJar_beforeCorrectJar").setAttribute("data-langkey", textMode + "Jar" + jar + "_beforeCorrectJar");
                document.getElementById("foundJar_correctJar").setAttribute("data-langkey", textMode + "Jar" + jar + "_correctJar");
                document.getElementById("foundJar_afterCorrectJar").setAttribute("data-langkey", textMode + "Jar" + jar + "_afterCorrectJar");

                revealFound(true);

                // if(lastDecodedText !== decodedText)
                //     playSound("Success",.5);

                lastDecodedText = decodedText;

                if(decodedText === "Flute"){
                    if(document.getElementById("poolsymbol").classList.contains("libraryJarSymbol"))
                        document.getElementById("poolsymbol").classList.remove("libraryJarSymbol");

                    if(document.getElementById("poolsymbol").classList.contains("regularJarSymbol"))
                        document.getElementById("poolsymbol").classList.remove("regularJarSymbol");

                    document.getElementById("poolsymbol").classList.add("flute");
                }else if(decodedText === "MainCavern"){
                    if(document.getElementById("poolsymbol").classList.contains("flute"))
                        document.getElementById("poolsymbol").classList.remove("flute");

                    if(document.getElementById("poolsymbol").classList.contains("libraryJarSymbol"))
                        document.getElementById("poolsymbol").classList.remove("libraryJarSymbol");

                    document.getElementById("poolsymbol").classList.add("regularJarSymbol");
                }else if(libraryPage){
                    if(document.getElementById("poolsymbol").classList.contains("flute"))
                        document.getElementById("poolsymbol").classList.remove("flute");

                    if(document.getElementById("poolsymbol").classList.contains("regularJarSymbol"))
                        document.getElementById("poolsymbol").classList.remove("regularJarSymbol");

                    document.getElementById("poolsymbol").classList.add("libraryJarSymbol");
                }else{
                    if(document.getElementById("poolsymbol").classList.contains("flute"))
                        document.getElementById("poolsymbol").classList.remove("flute");

                    if(document.getElementById("poolsymbol").classList.contains("libraryJarSymbol"))
                        document.getElementById("poolsymbol").classList.remove("libraryJarSymbol");

                    document.getElementById("poolsymbol").classList.add("regularJarSymbol");
                }

                document.getElementById("jarContinue").onclick = function(){
                    cameraMode = true;
                    pageTransition();
                    ctx.clearRect(0, 0, width, height);
                    document.getElementById("backImage").style.display = "none";
                    hideSymbol();
                    //revealFound(false);
                    if(libraryPage){
                        loadPage("libraryJar", jar);
                    }else{
                        loadPage("correctJar", jar);
                    }

                    if(!libraryPage && getSetting(SETTING.LANGUAGE, true) === 'en-US')
                        playSound(jar);
                };

            }else{
                console.log("failLastPage: " + lastDecodedText);
                if(!cameraMode || lastDecodedText === decodedText) //probably a rescan, must be different jar to be counted wrong again
                    break;

                // playSound("Failure",.5);
                lastDecodedText = decodedText;
                let failCount = parseInt(getSetting(SETTING.FAILCOUNT));

                if(failCount<5){
                    failCount++;
                    setSetting(SETTING.FAILCOUNT, failCount);
                }
                document.getElementById("wrongScanText").classList.remove("opacity-0");
                document.getElementById("wrongScanText").innerHTML = getTranslation("incorrect");

                revealNotFound(true);

                if(failCount >= 4){
                    toggleCameraMode(false);
                    loadPage("failScreen",findingJar);
                }else{
                    showFailSequence(findingJar, failCount);
                }
            }

            break;

    }

    processAllLocalizations();
    console.log("Cookie: " + document.cookie);
};
