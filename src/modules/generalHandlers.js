export const name = 'generalFns'

import lottie from 'lottie-web'

// HELPER FUNCTIONS
const closeFn = el => {
    el.classList.add('displayNone')
    document.documentElement.classList.remove('overflowHidden')
    if (el.parentElement.parentElement.parentElement.parentElement.classList.contains('pageLibraries')) {
        el.parentElement.parentElement.parentElement.parentElement.classList.remove('zIndex101')
    }
}

const jarContentFn = (library, btnSelector, wrapperSelector) => {
    const openBtn = library.querySelector(btnSelector)
    const contentWrapper = library.querySelector(wrapperSelector)
    const closeBtns = contentWrapper.querySelectorAll('.libraryCloseBtn')

    let mainLibrarySectionWrapper = library.querySelector('.mainLibrarySectionWrapper')

    openBtn.addEventListener('click', () => {
        mainLibrarySectionWrapper.classList.add('displayNone')
        contentWrapper.classList.remove('displayNone')
        document.documentElement.classList.add('overflowHidden')
    })

    closeBtns.forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            mainLibrarySectionWrapper.classList.remove('displayNone')
            contentWrapper.classList.add('displayNone')
        })
    })

    document.addEventListener('keydown', function(event){
        if(event.key === "Escape"){
            mainLibrarySectionWrapper.classList.remove('displayNone')
            contentWrapper.classList.add('displayNone')
        }
    })
}

const openFn = el => {
    el.classList.remove('displayNone')
    document.documentElement.classList.add('overflowHidden')
    if (el.parentElement.parentElement.parentElement.parentElement.classList.contains('pageLibraries')) {
        el.parentElement.parentElement.parentElement.parentElement.classList.add('zIndex101')
    }
}

const pageMenuFn = (menuBtnWrapper, pageMenu) => {
    const menuOpenBtn = menuBtnWrapper.querySelector('.openBtn')
    const menuCloseBtn = menuBtnWrapper.querySelector('.closeBtn')
    if (pageMenu.classList.contains('displayNone')) {
        pageMenu.classList.remove('displayNone')
        menuOpenBtn.classList.add('displayNone')
        menuCloseBtn.classList.remove('displayNone')
        document.documentElement.classList.add('overflowHidden')
    } else  {
        pageMenu.classList.add('displayNone')
        menuCloseBtn.classList.add('displayNone')
        menuOpenBtn.classList.remove('displayNone')
        document.documentElement.classList.remove('overflowHidden')
    }
}

const pageMenuLinkFn = (link, menuBtnWrapper, pageMenu) => {
    const btn = document.querySelector(link.btnSelector)
    const el = document.querySelector(link.elSelector)
    btn.addEventListener('click', () => {
        pageMenuFn(menuBtnWrapper, pageMenu)
        scrollHandler(link.elSelector)
    })
}

const personBioFn = person => {
    const btn = person.querySelector('button')
    const bio = person.querySelector('.bioWrapper')
    const bioCloseBtn = person.querySelector('.bioCloseBtn')

    if (bio && bioCloseBtn) {
        btn.addEventListener('click', () => {
            bio.classList.remove('displayNone')
            document.documentElement.classList.add('overflowHidden')
        })
        bioCloseBtn.addEventListener('click', () => {
            closeFn(bio)
        })
        document.addEventListener('keydown', function(event){
            if (event.key === "Escape"){
                closeFn(bio)
            }
        })
    }
}

const sliderFn = (sliderWrapper) => {
    let slideIndex = 1
    const slides = sliderWrapper.querySelectorAll(".sliderImageWrapper")
    const arrowLeft = sliderWrapper.querySelector('.arrowLeft')
    const arrowRight = sliderWrapper.querySelector('.arrowRight')

    const plusSlides = n => {
        showSlides(slideIndex += n)
    }

    const showSlides = n => {
        if (n > slides.length) {
            slideIndex = 1
        }
        if (n < 1) {
            slideIndex = slides.length
        }
        slides.forEach((slide, i) => {
            if (i === slideIndex-1) {
                slide.classList.remove('displayNone')
            } else {
                slide.classList.add('displayNone')
            }
        })
    }

    showSlides(slideIndex)

    arrowLeft.addEventListener('click', () => {
        plusSlides(-1)
    })

    arrowRight.addEventListener('click', () => {
        plusSlides(1)
    })
}
// HELPER FUNCTIONS







const librariesHandler = () => {
    const libraryContainers = document.querySelectorAll('.libraryContainer')

    libraryContainers.forEach(libraryContainer => {
        lightBoxHandler(libraryContainer, '.libraryMainBtn', '.libraryCloseMainBtn', '.libraryWrapper')
        const essayBtn = libraryContainer.querySelector('.essayBtn')
        if (essayBtn) {
            jarContentFn(libraryContainer, '.essayBtn', '.essayWrapper')
            jarContentFn(libraryContainer, '.galleryBtn', '.galleryWrapper')
            jarContentFn(libraryContainer, '.podcastBtn', '.podcastWrapper')
            jarContentFn(libraryContainer, '.scholarBtn', '.scholarWrapper')
        }
    })
}

const lightBoxHandler = (mainElSelector, openBtnSelector, closeBtnSelectors, wrapperSelector) => {
    let mainEl
    if (typeof(mainElSelector) === 'string') {
        mainEl = document.querySelector(mainElSelector)
    } else {
        mainEl = mainElSelector
    }
    const openBtn = mainEl.querySelector(openBtnSelector)
    const contentWrapper = mainEl.querySelector(wrapperSelector)
    const closeBtns = contentWrapper.querySelectorAll(closeBtnSelectors)

    openBtn.addEventListener('click', () => {
        openFn(contentWrapper)
    })

    closeBtns.forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            closeFn(contentWrapper)
        })
    })

    document.addEventListener('keydown', (event) => {
        if( event.key === "Escape" ){
            closeFn(contentWrapper)
        }
    })
}

const lottieHandler = (mainElSelector, animationData) => {
    const anim = lottie.loadAnimation({
        container: document.getElementById(mainElSelector),
        autoplay: true,
        renderer: 'svg',
        loop: true,
        animationData
    })
    anim.goToAndPlay(0, true)
}

const languageMenuHandler = () => {
    const mainEl = document.querySelector('.languageMenuWrapper')
    const languageMenuBtn = mainEl.querySelector('.languageMenuBtn')
    const languages = mainEl.querySelectorAll('.languageLinkWrapper')

    languageMenuBtn.addEventListener('click', () => {
        if (languages[0].classList.contains("displayNone")) {
            languages.forEach( language => {
                language.classList.remove("displayNone")
            })
        } else {
            languages.forEach( language => {
                language.classList.add("displayNone")
            })
        }
    })
}

const pageMenuHandler = links => {
    const menuBtnWrapper = document.querySelector('.mainMenuBtn')
    const pageMenu = document.querySelector('.pageMenu')
    menuBtnWrapper.addEventListener('click', () => {
        pageMenuFn(menuBtnWrapper, pageMenu)
    })
    links.forEach(link => {
        pageMenuLinkFn(link, menuBtnWrapper, pageMenu)
    })
}

const peopleBioHandler = () => {
    const personWrappers = document.querySelectorAll('.personWrapper')
    personWrappers.forEach(personWrapper => {
        personBioFn(personWrapper)
    })
}

const scrollHandler = mainElSelector => {
    const mainEl = document.querySelector(mainElSelector)
    const mainElOffsetTop = mainEl.offsetTop
    window.scrollTo({
        top: mainElOffsetTop,
        left: 0,
        behavior: 'smooth'
    })
}

const slidersHandler = () => {
    const sliderWrappers = document.querySelectorAll('.sliderWrapper')
    sliderWrappers.forEach(sliderWrapper => {
        sliderFn(sliderWrapper)
    })
}

const videoBGHandler = (mainElSelector, mainElAfterSelector) => {
    const mainEl = document.querySelector(mainElSelector)
    const videoBG = mainEl.querySelector('.videoBG')

    if(!videoBG) {
        return
    }

    const mainElAfter = document.querySelector(mainElAfterSelector)
    let mainElAfterH

    if (mainElAfterSelector !== '.pageFooter') {
        mainElAfterH = mainElAfter.offsetHeight
    } else {
        mainElAfterH = 0
    }

    if (mainEl.offsetHeight < window.innerHeight) {
        mainEl.classList.add('overflowHidden')
        return
    }

    if (window.innerWidth/16*9 > window.innerHeight) {
        if (window.scrollY < mainEl.offsetTop) {
            videoBG.classList.remove('videoBGFixed')
            videoBG.classList.remove('videoBGBottom')
            videoBG.classList.add('videoBGTop')
        } else if (window.scrollY >= mainEl.offsetTop && window.scrollY <= (mainEl.offsetTop + mainEl.offsetHeight - mainElAfterH)) {
            videoBG.classList.remove('videoBGTop')
            videoBG.classList.remove('videoBGBottom')
            videoBG.classList.add('videoBGFixed')
        } else {
            videoBG.classList.remove('videoBGTop')
            videoBG.classList.remove('videoBGFixed')
            videoBG.classList.add('videoBGBottom')
        }
    } else {
        if (window.scrollY < mainEl.offsetTop - (window.innerHeight - window.innerWidth/16*9)) {
            videoBG.classList.remove('videoBGFixed')
            videoBG.classList.remove('videoBGBottom')
            videoBG.classList.add('videoBGTop')
        } else if (window.scrollY >= mainEl.offsetTop - (window.innerHeight - window.innerWidth/16*9) && window.scrollY <= (mainEl.offsetTop + mainEl.offsetHeight - mainElAfterH)) {
            videoBG.classList.remove('videoBGTop')
            videoBG.classList.remove('videoBGBottom')
            videoBG.classList.add('videoBGFixed')
        } else {
            videoBG.classList.remove('videoBGTop')
            videoBG.classList.remove('videoBGFixed')
            videoBG.classList.add('videoBGBottom')
        }
    }
}

export { languageMenuHandler, lottieHandler, lightBoxHandler, librariesHandler, pageMenuHandler, peopleBioHandler, scrollHandler, slidersHandler, videoBGHandler }
