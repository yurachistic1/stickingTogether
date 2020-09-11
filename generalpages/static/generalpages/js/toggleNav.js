window.addEventListener('resize', makeNavAppear);
let x = document.getElementById("myLinks");

function makeNavAppear(){
    if(window.innerWidth >= 850){
        x.style.height = "100%"
        x.style.opacity = "1"
    } else {
        x.style.height = "0"
        x.style.opacity = "0"
    }
}

function toggleNav() {
    if (x.style.height === "100%") {
      x.style.height = "0"
      x.style.opacity = "0"
    } else {
      x.style.height = "100%"
      x.style.opacity = "1"
    }
  }