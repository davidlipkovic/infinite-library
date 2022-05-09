import "./assets/styles/index.scss"
import {
    languageMenuHandler,
    lottieHandler,
    librariesHandler,
    lightBoxHandler,
    pageMenuHandler,
    peopleBioHandler,
    scrollHandler,
    slidersHandler,
    videoBGHandler
} from './modules/generalHandlers.js'
import mainLogoAnimation from './assets/media/lottie/mainLogoAnimation.json'

window.addEventListener('load', () => {
    const goToLearnBtn = document.querySelector('.goToLearnBtn')
    goToLearnBtn.addEventListener('click', () => {
        scrollHandler('.pageTopVideo')
    })

    librariesHandler()
    lightBoxHandler('.pageMainCavern', '.openBtn', '.closeBtn', '.lightBoxWrapper')
    lightBoxHandler('.pageInstallation', '.openBtn', '.closeBtn', '.lightBoxWrapper')
    lottieHandler('mainLogoAnimContainer', mainLogoAnimation)
    lottieHandler('pageMenuLogoAnimContainer', mainLogoAnimation)
    languageMenuHandler()
    pageMenuHandler([
        {
            btnSelector: '.pageMenuLearnBtn',
            elSelector: '.pageTopVideo'
        },
        {
            btnSelector: '.pageMenuContactBtn',
            elSelector: '.pageFooter'
        }
    ])
    peopleBioHandler()
    slidersHandler()

    videoBGHandler('.topMenuWrapper', '.pageTopVideo')
    videoBGHandler('.pageAbout', '.pageQuote')
    videoBGHandler('.librariesWrapper', '.pageMainCavern')
    videoBGHandler('.pageCredits', '.pageFooter')

    window.addEventListener('scroll', () => {
        videoBGHandler('.topMenuWrapper', '.pageTopVideo')
        videoBGHandler('.pageAbout', '.pageQuote')
        videoBGHandler('.librariesWrapper', '.pageMainCavern')
        videoBGHandler('.pageCredits', '.pageFooter')
    })

    window.addEventListener('resize', () => {
        videoBGHandler('.topMenuWrapper', '.pageTopVideo')
        videoBGHandler('.pageAbout', '.pageQuote')
        videoBGHandler('.librariesWrapper', '.pageMainCavern')
        videoBGHandler('.pageCredits', '.pageFooter')
    })



    //
    // const pages = ["index", "booking", "index-de", "booking-de", "coming-soon", "experience"]
    // const languages = ["de", "cz"]
    //
    // for (let i1 = 0; i1 < pages.length; i1++) {
    //     let jsName
    //     for (let i2 = 0; i2 < languages.length; i2++) {
    //         if (pages[i1].includes(`-${languages[i2]}`)) {
    //             jsName = pages[i1].slice(0, pages[i1].indexOf(`-${languages[i2]}`))
    //             break
    //         } else {
    //             jsName = pages[i1]
    //         }
    //     }
    // }
})
