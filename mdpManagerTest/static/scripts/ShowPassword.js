function showPassword() {
  var passwordInput = document.getElementById("password");
  var faeye = document.getElementById("faeye");
  var faeyecross = document.getElementById("faeyecross");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
  if (faeye.style.display === "none") {
    faeye.style.display = "inline-block";
    faeyecross.style.display = "none";
  } else {
    faeyecross.style.display = "inline-block";
    faeye.style.display = "none";
  }
}