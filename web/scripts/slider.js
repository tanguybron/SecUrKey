var slider = document.getElementById("slider");
var output = document.getElementById("value");
output.innerHTML = "Lenght : " + slider.value;

slider.oninput = function() {
  output.innerHTML = "Lenght : " + this.value;
}