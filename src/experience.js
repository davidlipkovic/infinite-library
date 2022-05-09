import "./assets/styles/experience.scss"

import {lottieHandler} from './modules/generalHandlers.js';
import {
    logoSectionVisibilityHandler,
    moonPoolVoiceoverFn,
    pageVisibilityHandler,
    preventScrollFn,
    videoScrollControlFn,
    voiceoverFn,
    voiceoverFooterFn
} from './modules/experienceHandlers.js';

import mainLogoAnimation from './assets/media/lottie/mainLogoAnimation.json';

let mainOffY = 0
let pageIndex = 0
let videoEl, voiceoverEl, preloadLogoAnim
// const playbackConst = 1000
const playbackConst = window.innerHeight
const breakpointResponsive = 700
const logoBorder = window.innerHeight
const vidBorder = window.innerHeight*2

// 20s videos
const pageVideoObjects = [
    {
        pageId: 'introWrapper',
        offset: 0,
        pageVideoOffset: 0,
        pagePath: 'intro/',
        videoFileNameDesktop: 'bgVideo_intro_new',
        videoFileNamePhone: 'bgVideo_intro_new',
    },
    {
        pageId: 'mainCavernWrapper',
        pageLogo: undefined,
        pageVideo: undefined,
        pageVideoFixed: undefined,
        pageType: 'mainCavern',
        offset: 0,
        pageVideoOffset: 0,
        height: 19,
        pagePath: 'MainCavern/',
        videoFileNameDesktop: 'foyer1_20',
        videoFileNamePhone: 'foyer1_20_Phone',
        voiceoverFileName: 'mainCavern',
    },
    {
        pageId: 'moonpoolsWrapper',
        pageVideo: undefined,
        pageVideoFixed: undefined,
        pageType: 'moonpoolsWrapper',
        offset: 0,
        pageVideoOffset: 0,
        height: 169,
        pagePath: 'moonPools/',
        videoFileNameDesktop: 'moonPoolsLong',
        videoFileNamePhone: 'moonPoolsLongPhone',
        moonpoolWrapperID: 'moonpoolWrapper',
        voiceoverFileName: 'moonPoolVO_',
    },
    {
        pageId: 'libraryOfShadowsWrapper',
        pageLogo: undefined,
        pageVideo: undefined,
        pageVideoFixed: undefined,
        pageType: 'library',
        offset: 0,
        pageVideoOffset: 0,
        height: 20,
        pagePath: 'microLibraries/libraryOfShadows/',
        videoFileNameDesktop: 'shadowsPrologue20',
        videoFileNamePhone: 'shadowsPrologue20Phone',
        voiceoverFileName: 'libraryOfShadows',
    },
    {
        pageId: 'libraryOfElementsWrapper',
        pageLogo: undefined,
        pageVideo: undefined,
        pageVideoFixed: undefined,
        pageType: 'library',
        offset: 0,
        pageVideoOffset: 0,
        height: 19,
        pagePath: 'microLibraries/libraryOfElements/',
        videoFileNameDesktop: 'elementsEpilogue20',
        videoFileNamePhone: 'elementsEpilogue20Phone',
        voiceoverFileName: 'libraryOfElements',
    },
    {
        pageId: 'libraryOfNavigationWrapper',
        pageLogo: undefined,
        pageVideo: undefined,
        pageVideoFixed: undefined,
        pageType: 'library',
        offset: 0,
        pageVideoOffset: 0,
        height: 19,
        pagePath: 'microLibraries/libraryOfNavigation/',
        videoFileNameDesktop: 'navigationPrologue20',
        videoFileNamePhone: 'navigationPrologue20Phone',
        voiceoverFileName: 'libraryOfNavigation',
    },
    {
        pageId: 'pageFooter',
        mainEl: undefined,
        pageType: 'footer',
        pagePath: 'microLibraries/end/',
        voiceoverFileName: 'endVO',
    }
]

const videoBGHandlerWrapper = () => {
    let a = 1
    let off = 0
    let videoScrollControlFnCheck = false

    const moonpoolsMarksWrapper = document.getElementById('moonpoolsMarksWrapper')
    const moonpoolsMarks = moonpoolsMarksWrapper.querySelectorAll('.moonpoolMark')
    const moonpoolContentWrapper = document.getElementById('moonpoolContentWrapper')
    const moonpoolWrappers = moonpoolContentWrapper.querySelectorAll('.moonpoolWrapper')

    const videoPreloadHandler = (pageVideoObject, el, scrollFnCheck) => {
        if (videoEl.readyState >= 2) {
            setTimeout(() => {
                preloadLogoAnim.removeEventListener('wheel', preventScrollFn)
                setTimeout(() => {
                    preloadLogoAnim.classList.remove('zIndex20000')
                }, 500)
                preloadLogoAnim.classList.remove('transitionShow')
                preloadLogoAnim.classList.add('zIndex0')
                preloadLogoAnim.classList.add('transitionHide')
            }, 500)
            if (scrollFnCheck && a!== 0 && a !== 2) {
                voiceoverFn(voiceoverEl, pageVideoObjects[a].pageVideo)
            }
        } else {
            setTimeout(() => {
                videoPreloadHandler(pageVideoObject, el, scrollFnCheck)
            }, 10)
        }
    }

    const videoBGHandler = () => {
        let localOptions
        pageVideoObjects.forEach((pageVideoObject, i) => {
            if (i !== 6) {
                localOptions = {
                    rootMargin: `${vidBorder}px 0px ${vidBorder}px 0px`,
                    threshold: 0
                }
            } else {
                localOptions = {
                    rootMargin: `0px 0px 0px 0px`,
                    threshold: 1.0
                }
            }

            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    const intersecting = entry.isIntersecting
                    if (intersecting) {
                        a = i
                        off = pageVideoObject.pageVideoOffset
                        preloadLogoAnim.addEventListener('wheel', preventScrollFn)
                        if (window.innerWidth > breakpointResponsive) {
                            videoEl.src = `https://infinite-library.com/assets/experienceMedia/${pageVideoObject.videoFileNameDesktop}.webm`
                        } else if (i !== 6){
                            videoEl.src = `https://infinite-library.com/assets/experienceMedia/${pageVideoObject.videoFileNamePhone}.webm`
                        }
                        if (i === 0 ) {
                            videoEl.autoplay = true
                            videoEl.loop = true
                            videoScrollControlFnCheck = false
                        } else if (i !== 6){
                            videoEl.autoplay = false
                            videoEl.loop = false
                            videoScrollControlFnCheck = true
                            pageVideoObject.pageVideoFixed.classList.remove('transitionHide')
                            pageVideoObject.pageVideoFixed.classList.add('transitionShow')
                        } else {
                            videoScrollControlFnCheck = false
                        }
                        if (i !== 0  && i !== 2) {
                            voiceoverEl.src = `https://infinite-library.com/assets/experienceMedia/${pageVideoObject.voiceoverFileName}.mp3`
                            // voiceoverEl.src = `https://infinite-library.com/assets/experienceMedia/x.mp3`
                        }
                        if (i !== 6) {
                            preloadLogoAnim.classList.remove('transitionHide')
                            preloadLogoAnim.classList.remove('zIndex0')
                            preloadLogoAnim.classList.add('transitionShow')
                            preloadLogoAnim.classList.add('zIndex20000')
                        }
                        if (i === 0) {
                            videoPreloadHandler(pageVideoObject, el )
                        } else if (i !== 6){
                            videoPreloadHandler(pageVideoObject, el, true, i)
                        }
                        if (i === 6) {
                            voiceoverFooterFn(voiceoverEl, pageVideoObject.mainEl)
                        }
                    } else {
                        if (i !== 0 && i !== 6 ) {
                            pageVideoObject.pageVideoFixed.classList.remove('transitionShow')
                            pageVideoObject.pageVideoFixed.classList.add('transitionHide')
                        }
                    }
                    // videoEl.src = './src/assets/media/experience/' + pageVideoObjects[i].pagePath + pageVideoObjects[i].videoFileNameDesktop + '.webm'
                },localOptions)
            })

            let el = pageVideoObject.pageVideo
            if (!el) {
                el = document.getElementById(`${pageVideoObject.pageId}`)
            }
            observer.observe(el)
        })

        moonpoolsMarks.forEach((moonpoolMark, i2) => {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    const intersecting = entry.isIntersecting
                    if (intersecting) {
                        moonpoolWrappers[i2].classList.remove('transitionHide')
                        moonpoolWrappers[i2].classList.add('transitionShow')
                        voiceoverEl.src = `https://infinite-library.com/assets/experienceMedia/${pageVideoObjects[2].voiceoverFileName}${i2 + 1}.mp3`
                        // voiceoverEl.src = `https://infinite-library.com/assets/experienceMedia/x.mp3`
                        moonPoolVoiceoverFn(voiceoverEl, pageVideoObjects[2].pageVideo, moonpoolWrappers[i2])
                    } else {
                        moonpoolWrappers[i2].classList.remove('transitionShow')
                        moonpoolWrappers[i2].classList.add('transitionHide')
                    }
                })
            })
            observer.observe(moonpoolMark)
        })
    }

    videoBGHandler()

    window.addEventListener('scroll', () => {
        if (videoScrollControlFnCheck) {
            videoScrollControlFn(videoEl, off)
        }
    })
}


const setScrollPage = (pageVideoObject, offY = 0 ) => {
    let pageLogo, pageLogoFixed, pageLogoH
    const mainEl = document.querySelector(`#${pageVideoObject.pageId}`)
    const pageType = pageVideoObject.pageType

    if (pageType !== 'moonpoolsWrapper') {
        pageLogo = mainEl.querySelector('.pageLogo')
        pageLogoFixed = pageLogo.querySelector('.pageLogoFixed')
        pageLogoH = window.innerHeight*8
    } else {
        pageLogoH = 0
    }

    const pageVideo = mainEl.querySelector('.pageVideo')
    const pageVideoFixed = mainEl.querySelector('.pageVideoFixed')
    let vid = document.querySelector('#videoBG')

    let pageVideoH = pageVideoObject.height * playbackConst
    const pageH = pageLogoH + pageVideoH

    mainOffY += pageH
    mainEl.style.height = pageH + 'px'
    pageVideo.style.marginTop = pageLogoH + 'px'
    pageVideo.style.height = pageVideoH + 'px'

    if (pageType === 'mainCavern') {
        mainOffY += window.innerHeight
    }

    if (pageType === 'moonpoolsWrapper') {
        const moonpoolMarks = mainEl.querySelectorAll('.moonpoolMark')
        let marginTopMark = 0
        moonpoolMarks.forEach(moonpoolMark => {
            moonpoolMark.style.marginTop = marginTopMark + 'px'
            moonpoolMark.style.height = pageVideoH/8 + 'px'
            marginTopMark += pageVideoH/8
        })
    }

    pageVideoObject.pageLogo = pageLogo
    pageVideoObject.pageVideo = pageVideo
    pageVideoObject.pageVideoFixed = pageVideoFixed
    pageVideoObject.offset = offY
    pageVideoObject.pageVideoOffset = offY + pageLogoH

    pageVisibilityHandler(mainEl)
    if (pageType !== 'moonpoolsWrapper') {
        setTimeout(() => {
            pageLogoFixed.classList.add('transition')
        }, 1)
        logoSectionVisibilityHandler(pageLogo, pageLogoFixed)
    }
}

window.addEventListener('load', () => {
    const body = document.querySelector('body')

    setTimeout(() => {
        document.documentElement.scrollTop = 0
    }, 1)

    const headPhones = document.getElementById('headPhones')
    headPhones.addEventListener('click', () => {
        document.documentElement.classList.remove('beforeLoaded')
        document.documentElement.classList.remove('beforeClicked')
        videoEl.classList.remove('transitionHide')
        videoEl.classList.add('transitionShow')
        headPhones.remove()
    })

    videoEl = document.getElementById('videoBG')
    setTimeout(() => {
        videoEl.classList.add('transition1s')
    }, 1)

    lottieHandler('preloadLogoAnimContainer', mainLogoAnimation)
    lottieHandler('mainLogoAnimContainer', mainLogoAnimation)

    voiceoverEl = document.getElementById('voiceover')
    preloadLogoAnim = document.getElementById('preloadLogoAnim')

    const scrollDownIcon = document.getElementById('scrollDownIcon')
    scrollDownIcon.addEventListener('click', () => {
        window.scrollTo({
            top: window.innerHeight/10*11,
            left: 0,
            behavior: 'smooth'
        })
    })

    pageVideoObjects.forEach((pageVideoObject, i) => {
        if (i === 0) {
            const header = document.querySelector('header')
            pageVisibilityHandler(header)
        } else if (i !== 6) {
            setScrollPage(pageVideoObject, mainOffY)
        }
    })

    const pageFooter = document.querySelector('#pageFooter')
    pageVideoObjects[6].mainEl = pageFooter
    pageVisibilityHandler(pageFooter)

    videoBGHandlerWrapper()
})
