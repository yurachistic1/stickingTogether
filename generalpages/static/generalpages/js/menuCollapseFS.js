navbar = document.getElementById("navbar") // position: fixed; top: 0; width:100%
logo = document.getElementById("logo-link") // display: none
header = document.getElementById("website-header") // display: none
links = document.getElementById("links") // padding: 0.8rem 0 0.8rem 0
basket = document.getElementById("basket-icon") // grid-row: 3 / span 1
content = document.getElementById("content") // margin-top: 21 rem
bar = document.getElementById("myLinks") // remove hr
collapsed = false

rem = parseInt((getComputedStyle(document.querySelector(":root")).getPropertyValue("font-size")).replace("px", ""), 10)

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > rem * 20 || document.documentElement.scrollTop > rem * 20) {
      if (!collapsed){
        navbar.classList.add("navbar-grid-sm")
        logo.classList.add("logo-sm")
        header.classList.add("website-header-sm")
        links.classList.add("navbar-nav-sm")
        basket.classList.add("basket-icon-sm")
        bar.classList.remove("hr")
        content.classList.add("content-sm")
        collapsed = true
      }
  } else {
      if (collapsed){
        navbar.classList.remove("navbar-grid-sm")
        logo.classList.remove("logo-sm")
        header.classList.remove("website-header-sm")
        links.classList.remove("navbar-nav-sm")
        basket.classList.remove("basket-icon-sm")
        bar.classList.add("hr")
        content.classList.remove("content-sm")
        collapsed = false
      }
  }
}