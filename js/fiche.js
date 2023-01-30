const itemsNav = document.querySelector('.items-nav')
const navSlider = document.querySelectorAll(".slider-nav")
const checkBoxes = itemsNav.querySelectorAll('[type="checkbox"]');
const imageSlider = document.querySelector(".main-image")
const imageSwitcher = document.querySelector(".sub-image")

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

function slideImage() {
    let images = imageSlider.querySelectorAll("img")
    let subImages = []
    imageSlider.addEventListener("scroll", function (event) {
        let target = Number((event.target.scrollLeft / images[0].offsetWidth).toFixed(0))
        activeImage(target)

    })
    function activeImage(target) {
        for (let i = 0; i < subImages.length; i++) {
            const image = subImages[i];
            if (i === target) {
                image.classList.add("active")
            } else {
                image.classList.remove("active")
            }

        }
    }
    for (let i = 0; i < images.length; i++) {
        const image = images[i].cloneNode(true);
        image.setAttribute("name", i)

        image.addEventListener("click", function (event) {
            console.log(event.target.name, images[i].offsetLeft, imageSlider.offsetLeft);
            let x = images[i].offsetLeft - imageSlider.offsetLeft
            imageSlider.scrollTo({
                left: x,
                top: 0,
                behavior: 'smooth'
            })

        })

        imageSwitcher.appendChild(image)
        subImages.push(image)
    }
    activeImage(0)
}
slideImage()