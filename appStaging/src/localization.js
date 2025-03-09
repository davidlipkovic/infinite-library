var languages = Array.from(document.getElementsByClassName('language'));
var xhttp = new XMLHttpRequest();
var langDocument = {};
// languages.forEach(function(value, index){
//     languages[index].addEventListener('click', function(){
//         switchLanguage(this.dataset.lang);
//     });
// });
xhttp.onreadystatechange = function(){
    console.log("on ready fired");
    if (this.readyState === 4 && this.status === 200) {
        langDocument = JSON.parse(this.responseText);
        //processAllLocalizations();
    }
};

function switchLanguage(language, callback){
    xhttp.open("GET", "localizations/" + language + ".json", true);
    xhttp.setRequestHeader("Content-type", "application/json");


    xhttp.onreadystatechange = function(){
        console.log("switch language on ready fired");
        if (this.readyState === 4 && this.status === 200) {
            langDocument = JSON.parse(this.responseText);

            //languageList
            //language-primary
            highlightPrimaryLanguage(language);
            // forEach(function(currentValue, currentIndex, listObj){
            //     console.log(currentValue + ', ' + currentIndex + ', ' + this);
            // })

            //classList.remove("opacity-0");
            changeFontFamily(language);

            if(callback != null){
                callback();
            }

            //processAllLocalizations();
        }
    };
    xhttp.send();
}

async function processAllLocalizations(){
    console.log("Localizations processed ");
    processLangDocument();
    processCurrencyDocument();
    processDateTimes();

}
function changeFontFamily(language) {
    let fontFamily = "";

    if (language === "ru" || language === "kz") {
        fontFamily = "'Montserrat-light','Ropa Sans', sans-serif";
    } else {
        fontFamily = "'Natom-extralight','Montserrat-light','Ropa Sans', sans-serif";
    }

    document.body.style.fontFamily = fontFamily;
    document.querySelector(".highlightColor1").style.fontFamily = fontFamily;
    document.querySelector(".highlightColor2").style.fontFamily = fontFamily;
}


function getTranslation(key){

    //console.log( Array.from(tags)[key]);
    console.log("key: " + key);
    return langDocument[key];
}
function processLangDocument(){
    var tags = document.querySelectorAll('span,div,img,a,label,li,option,h1,h2,h3,h4,h5,h6');


    Array.from(tags).forEach(function(value, index){
        var key = value.dataset.langkey;

        if(key in langDocument){
            if(langDocument[key])
                value.innerHTML = langDocument[key];
            else
                value.innerHTML = "";
        }

    });
}
function processDateTimes() {
    var tags = document.querySelectorAll('span');
    Array.from(tags).forEach(function(value, index) {
        var key  = value.dataset.picker;
        if(!key) return;
        var val = new Date();
        val = val.toLocaleString(langDocument['LocaleFormat']);
        value.innerText = val;
    });
}
function processCurrencyDocument() {
    var tags = document.querySelectorAll('input');
    Array.from(tags).forEach(function(value, index) {
        var key = value.dataset.currency;
        value.value = "";
        if(!key) return;
        value.addEventListener("change", function(evt) {
            var val =  evt.target.value;
            val =  Number(val.replace(/[^0-9.-]+/g,""));
            evt.target.value = (val).toLocaleString(langDocument['LocaleFormat'], { style: 'currency', currency: langDocument['Currency']});
        });
    });
}