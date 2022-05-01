import "./assets/styles/experience.scss"

import {lottieHandler} from './modules/generalHandlers.js';
import {
    footerHandler,
    pageVisibilityHandler,
    preventScrollFn,
    sectionVisibilityHandler,
    setSectionVisibility
} from './modules/experienceHandlers.js';

import mainLogoAnimation from './assets/media/lottie/mainLogoAnimation.json';

let mainOffY = 0
const playbackConst = 1000
const breakpointResponsive = 700

const loadVideo = (mainEl) => {
    const vidD = mainEl.querySelector('.videoBGDesktop')
    const vidM = mainEl.querySelector('.videoBGPhone')
    let vid

    if ( window.innerWidth > breakpointResponsive) {
        if (vidM) {
            vidM.remove()
        }
        vid = vidD
    } else {
        if (vidD) {
            vidD.remove()
        }
        vid = vidM
        console.log('halo')
    }

    // if (vid.readyState !== 1) {
    //     setTimeout(() => {
    //         loadVideo(mainEl)
    //     }, 100)
    // }

    return vid
}

const setScrollPage = (mainEl, offY = 0, pageType ) => {
    let pageLogo, pageLogoFixed, pageLogoH, logoBorder

    if (pageType !== 'moonpoolsWrapper') {
        pageLogo = mainEl.querySelector('.pageLogo')
        pageLogoFixed = pageLogo.querySelector('.pageLogoFixed')
        pageLogoH = pageLogo.offsetHeight
        logoBorder = window.innerHeight
    } else {
        pageLogoH = 0
    }

    let seconds
    const pageVideo = mainEl.querySelector('.pageVideo')
    const pageVideoFixed = mainEl.querySelector('.pageVideoFixed')
    let vid = loadVideo(mainEl)

    const vidBorder = window.innerHeight*2
    const pageVideoH = Math.floor(vid.duration) * playbackConst
    const pageH = pageLogoH + pageVideoH

    mainOffY += pageH
    mainEl.style.height = pageH + 'px'
    vid.preload="auto";
    pageVideo.style.height = pageH + "px";

    if (pageType === 'mainCavern') {
        mainOffY += window.innerHeight
    }

    window.addEventListener('scroll', () => {
        pageVisibilityHandler(mainEl, pageH, offY)
        if (pageType !== 'moonpoolsWrapper') {
            setSectionVisibility(pageLogoFixed, logoBorder, pageLogoH, offY, pageType, 'sectionLogo', vid)
        }

        // if (window.scrollY <= (vidBorder + pageLogoH + offY) || window.scrollY >= (pageVideoH - vidBorder + pageLogoH + offY)) {
        //
        // }
        sectionVisibilityHandler(pageVideoFixed, vidBorder, pageVideoH, pageLogoH + offY, pageType, 'sectionVideo', vid)
    })
}

window.addEventListener('load', () => {
    lottieHandler('mainLogoAnimContainer', mainLogoAnimation)

    const vid1 = document.querySelector('.videoBG')

    if (vid1.readyState >= 2) {
        document.documentElement.classList.remove('beforeLoaded')
        setTimeout(() => {
            document.documentElement.scrollTop = 0
        }, 1)
    }

    const headPhones = document.getElementById('headPhones')
    headPhones.addEventListener('click', () => {
        document.documentElement.classList.remove('beforeClicked')
        headPhones.remove()
    })

    const scrollDownIcon = document.getElementById('scrollDownIcon')
    scrollDownIcon.addEventListener('click', () => {
        window.scrollTo({
            top: window.innerHeight + window.innerHeight/10*1,
            left: 0,
            behavior: 'smooth'
        });
    })

    const mainCavernWrapper = document.querySelector('#mainCavernWrapper')
    setScrollPage(mainCavernWrapper, mainOffY, 'mainCavern')

    const moonpoolsWrapper = document.querySelector('#moonpoolsWrapper')
    setScrollPage(moonpoolsWrapper, mainOffY, 'moonpoolsWrapper')

    const libraryOfShadowsWrapper = document.querySelector('#libraryOfShadowsWrapper')
    setScrollPage(libraryOfShadowsWrapper, mainOffY, 'library')

    const libraryOfElementsWrapper = document.querySelector('#libraryOfElementsWrapper')
    setScrollPage(libraryOfElementsWrapper, mainOffY, 'library')

    const libraryOfNavigationWrapper = document.querySelector('#libraryOfNavigationWrapper')
    setScrollPage(libraryOfNavigationWrapper, mainOffY, 'library')

    const pageFooter = document.querySelector('#pageFooter')
    window.addEventListener('scroll', () => {
        footerHandler(pageFooter, mainOffY)
    })
})
