window.addEventListener('resize', makeNavAppear);
var x = document.getElementById("myLinks");
var content = document.getElementById("content");

makeNavAppear()

function makeNavAppear(){
  console.log(navHeight)
    if(window.innerWidth >= 850){
        x.style.height = "100%"
        x.style.opacity = "1"
        content.style.marginTop = 0
    } else {
        x.style.height = "0"
        x.style.opacity = "0"
        var navHeight = (document.querySelector('.navbar-grid')).offsetHeight
        content.style.marginTop = navHeight + "px"
    }
}

function toggleNav() {
  menuIcon = document.querySelector('#hamburger-icon')
    if (x.style.height === "100%") {
      x.style.height = "0"
      x.style.opacity = "0"
      replaceClass(menuIcon, 'fa-times', 'fa-bars')
    } else {
      x.style.height = "100%"
      x.style.opacity = "1"
      replaceClass(menuIcon, 'fa-bars', 'fa-times')
    }
  }

function replaceClass(elem, c1, c2) {
  elem.classList.remove(c1)
  elem.classList.add(c2)
}