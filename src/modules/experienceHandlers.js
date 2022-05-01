export const name = 'experienceFns'

const playbackConst = 1000
const breakpointResponsive = 700

// HELPER FUNCTIONS

const preventScrollFn = e => {
    e.preventDefault();
    e.stopPropagation();
    return false;
}

const responsiveVideoFn = (mainEl, scrollY, border, dir1, dir2, vid) => {
    console.log(vid,'halo1')
    vid.play()
    window.scrollTo({
        top: scrollY + dir1*(window.innerHeight*2 + border),
        left: 0,
        behavior: 'smooth'
    })
    vid.onplay = function() {
        console.log(vid,'halo2')
        if (vid.currentTime > (vid.duration - 0.5)) {
            vid.pause()
        }
    }
    vid.onpause = function() {
        console.log('halo3')
        window.scrollTo({
            top: scrollY + dir2*(window.innerHeight*2.5),
            left: 0,
            behavior: 'smooth'
        })
        mainEl.removeEventListener('wheel', preventScrollFn)
    }
}

const voiceoverFn = (mainEl, border, elHeight, offY, vid, vidR) => {
    const voiceover = mainEl.querySelector('.voiceover')
    const text = mainEl.querySelector('.subtitlesWrapper')
    const scrollThreshold = offY + elHeight/2

    if (voiceover) {
        voiceover.play()
        voiceover.onplay = function() {
            mainEl.addEventListener('wheel', preventScrollFn)
        }
        voiceover.onended = function() {
            // if ( window.innerWidth > breakpointResponsive) {
                mainEl.removeEventListener('wheel', preventScrollFn)
            // } else {
            //     responsiveVideoFn(mainEl, offY + elHeight, border, -1, 1, vid)
            // }
            voiceover.remove()
            text.classList.add('transitionHide')
            setTimeout(() => {
                text.remove()
            }, 2000)
        }
    // } else {
    //     if (window.innerWidth > breakpointResponsive || vid.currentTime !== vid.duration || vidR.currentTime !== vidR.duration) {
    //          return
    //     }
    //     console.log(vid.currentTime, vid.duration)
    //     mainEl.addEventListener('wheel', preventScrollFn)
    //     if (window.scrollY < scrollThreshold && (vid.currentTime >= vid.duration)) {
    //         vidR.classList.add('displayNone')
    //         vid.classList.remove('displayNone')
    //         responsiveVideoFn(mainEl, offY + elHeight, border, -1, 1, vid)
    //     } else if (window.scrollY >= scrollThreshold && (vidR.currentTime >= vidR.duration)) {
    //         vid.classList.add('displayNone')
    //         vidR.classList.remove('displayNone')
    //         responsiveVideoFn(mainEl, offY, border, 1, -1, vidR)
    //     }
    }
}

const responsiveMoonPoolVideoFn = (mainEl, vid, i) => {
    vid.play()
    window.scrollTo({
        top: scrollY + dir1*(window.innerHeight*2 + border),
        left: 0,
        behavior: 'smooth'
    })
    vid.onplay = function() {
        if (vid.currentTime > (vid.duration/8 * i)) {
            vid.pause()
        }
    }
    vid.onpause = function() {
        window.scrollTo({
            top: scrollY + dir2*(window.innerHeight*2.5),
            left: 0,
            behavior: 'smooth'
        })
        mainEl.removeEventListener('wheel', preventScrollFn)
    }
}

const moonPoolVoiceoverFn = (parentEl, el, vid, i) => {
    const voiceover = el.querySelector('.voiceover')
    const text = el.querySelector('.subtitlesWrapper')
    if (voiceover) {
        voiceover.play()
        voiceover.onplay = function() {
            parentEl.addEventListener('wheel', preventScrollFn)
        }
        voiceover.onended = function() {
            // if ( window.innerWidth > breakpointResponsive) {
                parentEl.removeEventListener('wheel', preventScrollFn)
            // } else {
            //     responsiveMoonPoolVideoFn(parentEl, vid, i)
            // }
            voiceover.remove()
            text.classList.add('transitionHide')
            setTimeout(() => {
                text.remove()
            }, 2000)
        }
    }
}

const voiceoverMoonPoolsFn = (mainEl, offY, vid) => {
    const parent = mainEl.parentElement
    const parentH = parent.offsetHeight
    const moonpoolWrappers = mainEl.querySelectorAll('.moonpoolWrapper')
    let ooff = offY
    moonpoolWrappers.forEach((moonpoolWrapper, i) => {
        if (window.scrollY <= (ooff + window.innerHeight*3) || window.scrollY >= (ooff + parentH/8 - window.innerHeight*1)) {
            moonpoolWrapper.classList.remove('transitionShow')
            moonpoolWrapper.classList.add('transitionHide')
        } else {
            moonpoolWrapper.classList.remove('transitionHide')
            moonpoolWrapper.classList.add('transitionShow')
            moonPoolVoiceoverFn(parent, moonpoolWrapper, vid, i)
        }
        ooff += parentH/8
    })
}

const voiceoverFooterFn = (mainEl) => {
    const voiceover = mainEl.querySelector('.voiceover')
    if (voiceover) {
        voiceover.play()
        voiceover.onplay = function () {
            mainEl.addEventListener('wheel', preventScrollFn)
        }
        voiceover.onended = function () {
            mainEl.removeEventListener('wheel', preventScrollFn)
            voiceover.remove()
        }
    }
}

// const musicVolumeFn = () => {
//
// }

const musicPlayFn = (mainEl, pageType, sectionType) => {
    const music = mainEl.querySelector('.music')
    if (music && pageType !== 'moonpoolsWrapper' && sectionType === 'sectionVideo') {
        music.play()
    }
}

const musicStopFn = (mainEl, pageType, sectionType) => {
    const music = mainEl.querySelector('.music')
    if (music && pageType !== 'moonpoolsWrapper' && sectionType === 'sectionVideo') {
        // let volume = 1
        // const volumeDiff = 0.02
        //
        // const volumeInterval = setInterval(() => {
        //     volume = volume - volumeDiff
        //     music.volume = volume
        // }, 20)
        //
        // setTimeout(() => {
        //     clearInterval(volumeInterval)
        // }, 1000)

        music.pause()
    }
}

const videoFn = (vid, seconds) => {
    window.requestAnimationFrame(() => {
        // videoFn(vid, seconds)
        if (vid.readyState !== 1) {
            vid.currentTime = seconds
        }
    })
}

// HELPER FUNCTIONS



const pageVisibilityHandler = (mainEl, elHeight, offY = 0) => {
    if (window.scrollY <= offY || window.scrollY >= (elHeight + offY)) {
        mainEl.classList.remove('zIndex2')
        mainEl.classList.add('zIndex1')
    } else {
        mainEl.classList.remove('zIndex1')
        mainEl.classList.add('zIndex2')
    }
}

const sectionVisibilityHandler = (mainEl, border, elHeight, offY = 0, pageType, sectionType, vid) => {
    let seconds = (window.pageYOffset - offY)/playbackConst
    const vidR = mainEl.querySelector('.videoBGReversed')

    if ((window.scrollY <= (offY - window.innerHeight*2.6)) && vidR) {
        vidR.currentTime = vidR.duration
    }

    if ((window.scrollY >= (offY + elHeight + window.innerHeight*2.6)) && vidR) {
        vid.currentTime = vid.duration
    }

    if (window.scrollY <= (border + offY) || window.scrollY >= (elHeight - border + offY)) {
        mainEl.classList.remove('transitionShow')
        mainEl.classList.add('transitionHide')
        musicStopFn(mainEl, pageType, sectionType)
    } else {
        mainEl.classList.remove('transitionHide')
        mainEl.classList.add('transitionShow')
        // musicPlayFn(mainEl, pageType, sectionType)
        if (sectionType === 'sectionVideo') {
            // if ( window.innerWidth > breakpointResponsive) {
                videoFn(vid, seconds)
            // }
            if (pageType === 'moonpoolsWrapper') {
                voiceoverMoonPoolsFn(mainEl, offY, vid)
            } else {
                voiceoverFn(mainEl, border, elHeight, offY, vid, vidR)
            }
        }
    }
}

const footerHandler = (mainEl, offY) => {
    if (window.scrollY >= offY - window.innerHeight) {
        voiceoverFooterFn(mainEl)
    }
}

const setSectionVisibility = (mainEl, border, elHeight, offY = 0, pageType, sectionType, vid ) => {
    setTimeout(() => {
        mainEl.classList.add('transition')
    }, 1)
    sectionVisibilityHandler(mainEl, border, elHeight, offY, pageType, sectionType, vid)
}

export { footerHandler, pageVisibilityHandler, sectionVisibilityHandler, preventScrollFn, setSectionVisibility }
