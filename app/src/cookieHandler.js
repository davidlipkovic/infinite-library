
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";

    showAllCookies();
    // console.log("Set Cookie " + cname + " to " + cvalue);
    // console.log("cookie now: " + document.cookie);
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function showAllCookies(){
    console.log("Cookies: " + document.cookie);
}
function deleteAllCookies(){
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;Progression=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

/**
 * getCookieValue
 * @param {COOKIE} type to get
 * @return {String} value returned
 */
function getCookieValue(type){
    return getCookie(type);
}
/**
 * setCookieValue
 * @param {COOKIE} type to set
 * @param {String} value to set
 * @return {void}
 */
function setCookieValue(type, value){
    setCookie(type, value.toString(),1);
}
/**
 * deleteCookieValue
 * @param {COOKIE} type to delete
 * @return {void}
 */
function deleteCookieValue(type){
    setCookie(type, "",0);
}

function getFindJar(){
    return getCookie("findjar");
}
function setFindJarCookie(findjar){
    setCookie("findjar", findjar.toString(),1);
}

function checkCookie() {
    let user = getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            setCookie("username", user, 365);
        }
    }
}