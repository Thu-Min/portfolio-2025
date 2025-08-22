/* A simple typewriter effect for elements with class 'typewriter' */
document.addEventListener("DOMContentLoaded", function () {
  var elements = document.querySelectorAll(".typewriter");
  elements.forEach(function (el) {
    var text = el.textContent;
    el.textContent = "";
    var i = 0;
    function type() {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
        setTimeout(type, 60);
      }
    }
    type();
  });
});
