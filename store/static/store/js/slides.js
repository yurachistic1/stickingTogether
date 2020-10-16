const containers = document.getElementsByClassName("slideshow-container")

for (let k = 0; k < containers.length; k++){
    showSlides(0, "slides" + containers[k].id)
}

// Next/previous controls
function plusSlides(n, id, current) {
  showSlides(current + n, id);
}

function showSlides(n, id) {
  var i;
  var slides = document.getElementsByClassName(id);
  if (n === slides.length) {n = 0}
  if (n < 0) {n = slides.length - 1}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  slides[n].style.display = "block";
  if (slides.length > 1){
    next = document.getElementById("n" + id)
    prev = document.getElementById("p" + id)
    next.onclick = function() {plusSlides(1, id, n)}
    prev.onclick = function() {plusSlides(-1, id, n)}
  }
}