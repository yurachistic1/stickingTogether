function toggleNav() {
    var x = document.getElementById("myLinks");
    if (x.style.height === "100%") {
      x.style.height = "0"
      x.style.opacity = "0"
    } else {
      x.style.height = "100%"
      x.style.opacity = "1"
    }
  }