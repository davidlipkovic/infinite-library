import "./assets/styles/coming-soon.scss"

window.addEventListener('load', () => {
  const goBackBtn = document.querySelector('.goBackBtn')
  goBackBtn.addEventListener('click',() => {
    history.back()
  })
})
