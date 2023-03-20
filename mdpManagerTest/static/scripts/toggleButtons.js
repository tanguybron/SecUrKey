var toggleLetterValue = true;
var toggleLetterButton = document.getElementById("toggleLetter");
toggleLetterButton.setAttribute("value", "1");

toggleLetterButton.onclick = function () {
    toggleLetterValue = !toggleLetterValue;
    var checkIconLetter = document.getElementById("checkIconLetter");
    var crossIconLetter = document.getElementById("crossIconLetter");
    if (toggleLetterValue) {     
        toggleLetterButton.setAttribute("value", "1");
    } else { 
        toggleLetterButton.setAttribute("value", "0");
    }
    if (checkIconLetter.style.display === "none") {
        checkIconLetter.style.display = "inline-block";
        crossIconLetter.style.display = "none";
    } else {
        checkIconLetter.style.display = "none";
        crossIconLetter.style.display = "inline-block";
    }
}

//======================================================================

var toggleNumberValue = true;
var toggleNumberButton = document.getElementById("toggleNumber");
toggleNumberButton.setAttribute("value", "1");

toggleNumberButton.onclick = function () {
    toggleNumberValue = !toggleNumberValue;
    var checkIconNumber = document.getElementById("checkIconNumber");
    var crossIconNumber = document.getElementById("crossIconNumber");
    if (toggleNumberValue) {
        toggleNumberButton.setAttribute("value", "1");
    } else {
        toggleNumberButton.setAttribute("value", "0");
    }
    if (checkIconNumber.style.display === "none") {
        checkIconNumber.style.display = "inline-block";
        crossIconNumber.style.display = "none";
    } else {
        checkIconNumber.style.display = "none";
        crossIconNumber.style.display = "inline-block";
    }
}

//======================================================================

var toggleSpecialValue = true;
var toggleSpecialButton = document.getElementById("toggleSpecial");
toggleSpecialButton.setAttribute("value", "1");

toggleSpecialButton.onclick = function () {
    toggleSpecialValue = !toggleSpecialValue;
    var checkIconSpecial = document.getElementById("checkIconSpecial");
    var crossIconSpecial = document.getElementById("crossIconSpecial");
    if (toggleSpecialValue) {
        toggleSpecialButton.setAttribute("value", "1");
    } else {
        toggleSpecialButton.setAttribute("value", "0");
    }
    if (checkIconSpecial.style.display === "none") {
        checkIconSpecial.style.display = "inline-block";
        crossIconSpecial.style.display = "none";
    } else {
        checkIconSpecial.style.display = "none";
        crossIconSpecial.style.display = "inline-block";
    }
}
