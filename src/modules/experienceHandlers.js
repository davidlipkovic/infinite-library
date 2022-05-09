export const name = 'experienceFns'

// const playbackConst = 1000
const playbackConst = window.innerHeight
const breakpointResponsive = 700
const logoBorder = window.innerHeight
const vidBorder = window.innerHeight*2

// HELPER FUNCTIONS

const preventScrollFn = e => {
    e.preventDefault();
    e.stopPropagation();
    return false;
}

const voiceoverFn = (voiceover, mainEl) => {
    const text = mainEl.querySelector('.subtitlesWrapper')
    if (voiceover.readyState > 1) {
        voiceover.play()
        voiceover.onplay = function() {
            mainEl.addEventListener('wheel', preventScrollFn)
            text.classList.remove('transitionHide')
            text.classList.add('transitionShow')
        }
        voiceover.onended = function() {
            mainEl.removeEventListener('wheel', preventScrollFn)
            // voiceover.remove()
            text.classList.add('transitionHide')
            // setTimeout(() => {
            //     text.remove()
            // }, 2000)
        }
    } else {
        setTimeout(() => {
            voiceoverFn(voiceover, mainEl)
        }, 10)
    }
}

const moonPoolVoiceoverFn = (voiceover, parentEl, el) => {
    const text = el.querySelector('.subtitlesWrapper')
    if (voiceover.readyState > 1) {
        voiceover.play()
        voiceover.onplay = function() {
            parentEl.addEventListener('wheel', preventScrollFn)
        }
        voiceover.onended = function() {
            parentEl.removeEventListener('wheel', preventScrollFn)
            text.classList.add('transitionHide')
        }
    } else {
        setTimeout(() => {
            moonPoolVoiceoverFn(voiceover, parentEl, el)
        }, 10)
    }
}

const voiceoverFooterFn = (voiceover, mainEl) => {
    if (voiceover.readyState > 1) {
        voiceover.play()
        voiceover.onplay = function () {
            mainEl.addEventListener('wheel', preventScrollFn)
        }
        voiceover.onended = function () {
            mainEl.removeEventListener('wheel', preventScrollFn)
            voiceover.remove()
        }
    } else {
        setTimeout(() => {
            voiceoverFooterFn(voiceover, mainEl)
        }, 10)
    }
}

const musicPlayFn = (mainEl, pageType, sectionType) => {
    const music = mainEl.querySelector('.music')
    if (music && pageType !== 'moonpoolsWrapper' && sectionType === 'sectionVideo') {
        music.play()
    }
}

const musicStopFn = (mainEl, pageType, sectionType) => {
    const music = mainEl.querySelector('.music')
    if (music && pageType !== 'moonpoolsWrapper' && sectionType === 'sectionVideo') {
        music.pause()
    }
}

const videoScrollControlFn = (vid, off) => {
    let seconds = (window.pageYOffset - off)/playbackConst
    window.requestAnimationFrame(() => {
        // videoScrollControlFn(vid, off)
        if (vid.readyState > 1) {
            vid.currentTime = seconds
        }
    })
}

const pageVisibilityHandler = mainEl => {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const intersecting = entry.isIntersecting
            if (intersecting) {
                mainEl.classList.remove('zIndex1')
                mainEl.classList.add('zIndex2')
            } else {
                mainEl.classList.remove('zIndex2')
                mainEl.classList.add('zIndex1')
            }
        })
    })
    observer.observe(mainEl)
}

const logoSectionVisibilityHandler = (observedEl, mainEl) => {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const intersecting = entry.isIntersecting
            if (intersecting) {
                mainEl.classList.remove('transitionHide')
                mainEl.classList.add('transitionShow')
            } else {
                mainEl.classList.remove('transitionShow')
                mainEl.classList.add('transitionHide')
            }
        })
    },
{
        // rootMargin: `${logoBorder}px 0px ${-1*logoBorder}px 0px`
        // rootMargin: `0px 0px -1000px 0px`
        threshold: 0.1
    })
    observer.observe(observedEl)
}

export {
    logoSectionVisibilityHandler,
    moonPoolVoiceoverFn,
    pageVisibilityHandler,
    preventScrollFn,
    videoScrollControlFn,
    voiceoverFn,
    voiceoverFooterFn
}
