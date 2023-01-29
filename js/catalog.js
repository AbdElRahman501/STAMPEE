const cards = document.querySelector(".grid-cards")
const filter = document.querySelector(".filter")
const checkBoxes = filter.querySelectorAll('[type="checkbox"]');
const buttons = filter.querySelectorAll('button');
const range = filter.querySelector('input[type="range"]');
const pageNum = document.querySelector(".page-num")


let filteredProducts = []
let totalProducts = []
let currantPage = 0
function createCard(product) {
    let anchor = document.createElement("a")
    anchor.classList.add("none")
    let card = document.createElement("div")
    card.classList.add("card")
    let heartIcon = document.createElement("i")
    heartIcon.classList.add("icon")
    heartIcon.classList.add("fa")
    heartIcon.classList.add("fa-heart")

    let image = document.createElement("img")
    image.setAttribute('src', product.image_Url)
    let content = document.createElement("div")
    content.classList.add("content")
    let title = document.createElement("h3")
    title.classList.add("title")
    title.textContent = product.title
    let price = document.createElement("p")
    price.classList.add("price")
    price.textContent = product.currency_icon + product.price
    let description = document.createElement("p")
    description.classList.add("description")
    description.textContent = product.description

    cards.appendChild(anchor)

    anchor.appendChild(card)

    card.appendChild(heartIcon)
    card.appendChild(image)
    card.appendChild(content)

    content.appendChild(title)
    content.appendChild(price)
    content.appendChild(description)

}
let rang = 12
function filterPrice() {
    let pricesCheckBoxes = filter.querySelectorAll('input[filter="prices"]:checked');
    let lessThan100 = []
    let from100To500 = []
    let more500 = []
    let rangePrice = []

    pricesCheckBoxes.forEach(function (pricesCheckBox) {
        if (pricesCheckBox.name === "less-than-100") {
            lessThan100 = products.filter(function (product) {
                if (product.price <= 100) {
                    return product
                } else return;
            })
        } else if (pricesCheckBox.name === "100-to-500") {
            from100To500 = products.filter(function (product) {
                if (product.price > 100 && product.price <= 500) {
                    return product
                } else return;
            })
        } else if (pricesCheckBox.name === "more-than-500") {
            more500 = products.filter(function (product) {
                if (product.price > 500) {
                    return product
                } else return;
            })

        }
    });
    if (range.value) {
        rangePrice = products.filter(function (product) {
            if (product.price < range.value) {
                return product
            } else return;
        })
    }
    filteredProducts = [...filteredProducts, ...rangePrice, ...lessThan100, ...from100To500, ...more500]
    filteredProducts = [...new Set(filteredProducts)];
}
range.addEventListener("change", function (event) {
    let priceRange = document.querySelector("p.price-range")
    priceRange.textContent = event.target.value
})
function reset(event) {
    let type = event.target.getAttribute('filter')
    let pricesCheckBoxes = filter.querySelectorAll(`input[filter="${type}"]`);
    pricesCheckBoxes.forEach(function (pricesCheckBox) {
        if (pricesCheckBox.type === "checkbox") {
            pricesCheckBox.checked = false
        }
    })
    if (event.target.getAttribute('filter') === "range-prices") {
        range.value = 1
        let priceRange = document.querySelector("p.price-range")
        priceRange.textContent = 1
    }
    submitFilter(0, rang)

}

buttons.forEach(function (button) {
    button.addEventListener("click", reset)
});

function submitFilter(num, rang) {
    filteredProducts = []
    totalProducts = []
    filterPrice()
    if (filteredProducts.length === 0) {
        filteredProducts = products

    }
    if (filteredProducts.length > 0) {
        cards.innerHTML = ""
        let i = 0
        while(filteredProducts.length > i + rang) {
        totalProducts.push(filteredProducts.slice(i, i + rang))
        i = i + rang
    }
    if (filteredProducts.length > i && filteredProducts.length <= i + rang) {
        totalProducts.push(filteredProducts.slice(i, filteredProducts.length))
    }
    if (totalProducts.length > 0) {

    }
    totalProducts[num].forEach(createCard);
    pageNum.innerHTML = ""
    for (let i = 0; i < totalProducts.length; i++) {
        addPageNum(i, num)
        currantPage = num
    }
}
}
function addPageNum(num, selectedPage) {
    if (selectedPage !== 0 && num === 0) {
        let li = document.createElement("li")
        li.innerHTML = `<i class="fa fa-angle-left"></i>`

        li.addEventListener("click", function (event) {
            submitFilter(currantPage - 1, rang)
            scrollToTop()

        })
        pageNum.appendChild(li)
    }

    let li = document.createElement("li")
    li.setAttribute("value", num)
    li.textContent = num + 1
    if (num === selectedPage) {
        li.classList.add("selected")
    }
    li.addEventListener("click", function (event) {
        submitFilter(event.target.value, rang)
        scrollToTop()

    })
    pageNum.appendChild(li)
    if (selectedPage < totalProducts.length - 1 && num === totalProducts.length - 1) {
        let li = document.createElement("li")
        li.innerHTML = `<i class="fa fa-angle-right"></i>`

        li.addEventListener("click", function (event) {
            submitFilter(currantPage + 1, rang)
            scrollToTop()

        })
        pageNum.appendChild(li)
    }
}

submitFilter(0, rang)

