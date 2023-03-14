function scorePassword() {
  let password = document.getElementById("password").value;
  let score = 0;
  if (!password) {
    return score;
  }
  // award every unique letter until 5 repetitions
  let letters = {};
  for (let i = 0; i < password.length; i++) {
    letters[password[i]] = (letters[password[i]] || 0) + 1;
    score += 5.0 / letters[password[i]];
  }

  // bonus points for mixing it up
  let variations = {
    digits: /\d/.test(password),
    lower: /[a-z]/.test(password),
    upper: /[A-Z]/.test(password),
    nonWords: /\W/.test(password),

  }
  let variationCount = 0;
  for (let check in variations) {
    variationCount += (variations[check] == true) ? 1 : 0;
  }
  score += (variationCount - 1) * 8;
  return Math.round(score);
}

function updateProgressBar() {
  let strength = scorePassword();

  const progressBar = document.getElementById("strength-bar");
  const progressColor = strength > 90 ? "green" : strength > 50 ? "orange" : "red";
  const progressWidth = strength > 90 ? 21 : strength > 50 ? 14 : strength > 0 ? 7 : 0;
  const progressHeigth = strength > 0 ? 10 : 0;

  progressBar.style.width = `${progressWidth}vw`;
  progressBar.style.height = `${progressHeigth}px`;
  progressBar.style.backgroundColor = progressColor;
}