import "./assets/styles/booking.scss"
import {lottieHandler, pageMenuHandler, slidersHandler, videoBGHandler} from './modules/generalHandlers.js';
import mainLogoAnimation from './assets/media/lottie/mainLogoAnimation.json';

window.addEventListener('load', () => {
    lottieHandler('pageMenuLogoAnimContainer', mainLogoAnimation)
    pageMenuHandler([
        {
            btnSelector: '.pageMenuContactBtn',
            elSelector: '.pageFooter'
        }
    ])
    slidersHandler()

    videoBGHandler('.pageInstallation', '.sliderWrapper')
    videoBGHandler('.pageVR', '.pageQuote')
    videoBGHandler('.pageBooking', '.pageFooter')

    window.addEventListener('scroll', () => {
        videoBGHandler('.pageInstallation', '.sliderWrapper')
        videoBGHandler('.pageVR', '.pageQuote')
        videoBGHandler('.pageBooking', '.pageFooter')
    })

    window.addEventListener('resize', () => {
        videoBGHandler('.pageInstallation', '.sliderWrapper')
        videoBGHandler('.pageVR', '.pageQuote')
        videoBGHandler('.pageBooking', '.pageFooter')
    })
})
