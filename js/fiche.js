const itemsNav = document.querySelector('.items-nav')
const navSlider = document.querySelectorAll(".slider-nav")
const checkBoxes = itemsNav.querySelectorAll('[type="checkbox"]');



checkBoxes.forEach(function (checkBox) {
    checkBox.addEventListener("click", function (event) {
        for (var i = 0; i < checkBoxes.length; i++) {
            checkBoxes[i].checked = false;
        }
        event.target.checked = true;
    })
})

navSlider.forEach(slider => {
    let x = slider.offsetWidth
    let y = slider.scrollLeft
    let pv = slider.querySelector(".previous")
    let nx = slider.querySelector(".next")

    let cards = slider.querySelectorAll("li")
    function scroller() {
        x = slider.offsetWidth
        y = slider.scrollLeft
        if (y < 10) {
            pv.setAttribute("style", "display:none;")
            nx.setAttribute("style", "")
        } else {
            pv.setAttribute("style", "")
            nx.setAttribute("style", "display:none;")
        }
       
    }

    slider.addEventListener('scroll', scroller)
    scroller()

    pv.addEventListener('click', scrollLift)
    nx.addEventListener('click', scrollRight)


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