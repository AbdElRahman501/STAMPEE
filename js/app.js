function scrollToTop() {
  window.scrollTo({
    left: 0,
    top: 0,
    behavior: 'smooth'
  })
}
const slider = document.querySelector(".scroll-container")
let x = slider.offsetWidth
let y = slider.scrollLeft
const pv = slider.querySelector(".previous")
const nx = slider.querySelector(".next")

const cards = slider.querySelectorAll(".card")

function scroller() {
  x = slider.offsetWidth
  y = slider.scrollLeft
  console.log(y);
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
