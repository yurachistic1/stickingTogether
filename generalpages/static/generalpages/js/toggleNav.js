window.addEventListener('resize', makeNavAppear);
var x = document.getElementById("myLinks");
var content = document.getElementById("content");
var menuIcon = document.querySelector('#hamburger-icon')

makeNavAppear()

function makeNavAppear(){
    if(window.innerWidth >= 850){
        x.style.height = "100%"
        x.style.opacity = "1"
        content.classList.remove("content-mobile")
    } else {
        x.style.height = "0"
        x.style.opacity = "0"
        content.classList.add("content-mobile")
        replaceClass(menuIcon, 'fa-times', 'fa-bars')
    }
}

function toggleNav() {
    if (x.style.height === "100%") {
      x.style.height = "0"
      x.style.opacity = "0"
      replaceClass(menuIcon, 'fa-times', 'fa-bars')
      var navHeight = (document.querySelector('.navbar-grid')).offsetHeight
      content.style.marginTop = navHeight + "px"
    } else {
      x.style.height = "100%"
      x.style.opacity = "1"
      replaceClass(menuIcon, 'fa-bars', 'fa-times')
      var navHeight = (document.querySelector('.navbar-grid')).offsetHeight
      content.style.marginTop = navHeight + "px"
    }
  }

function replaceClass(elem, c1, c2) {
  elem.classList.remove(c1)
  elem.classList.add(c2)
}