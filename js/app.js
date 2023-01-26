function scrollToTop() {
  window.scrollTo({
    left: 0,
    top: 0,
    behavior: 'smooth'
  })
}
const sliders = document.querySelectorAll(".scroll-container")

sliders.forEach(slider => {
  let x = slider.offsetWidth
  let y = slider.scrollLeft
  let pv = slider.querySelector(".previous")
  let nx = slider.querySelector(".next")

  let cards = slider.querySelectorAll(".card")

  function scroller() {
    x = slider.offsetWidth
    y = slider.scrollLeft
    if (y < 10) {
      pv.setAttribute("style", "display:none;")
    } else {
      pv.setAttribute("style", "")
    }
    if (x > cards[cards.length - 1].getBoundingClientRect().x) {
      nx.setAttribute("style", "display:none;")
    } else {
      nx.setAttribute("style", "")
    }
  }

  slider.addEventListener('scroll', scroller)
  scroller()
  let pvBtn = slider.querySelector(".previous button")
  let nxBtn = slider.querySelector(".next button")

  pvBtn.addEventListener('click', scrollLift)
  nxBtn.addEventListener('click', scrollRight)


  function scrollRight() {
    x = x + y
    slider.scrollTo({
      left: x,
      top: 0,
      behavior: 'smooth'
    })
  }
  function scrollLift() {
    x = y - x
    slider.scrollTo({
      left: x,
      top: 0,
      behavior: 'smooth'
    })
  }
});



