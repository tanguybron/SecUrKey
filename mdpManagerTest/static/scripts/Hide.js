const btn3List = document.querySelectorAll('.hide');
btn3List.forEach(btn3 => {
  const icon = btn3.querySelector('i');
  const password = btn3.closest('.account').querySelector('.password-text');
  let passwordShown = false;
  const passwordLength = password.textContent.length;
  password.dataset.password = password.textContent;
  password.textContent = '*'.repeat(16);
  btn3.addEventListener('click', () => {
    event.preventDefault();
    passwordShown = !passwordShown;
    if (passwordShown) {
      password.textContent = decrypting(password.dataset.password);
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');
    } else {
      password.textContent = '*'.repeat(16);
      icon.classList.remove('fa-eye');
      icon.classList.add('fa-eye-slash');
    }
  });
});

function decrypting(cryptedPassword)
{
    var passPhrase="shesh";
    return CryptoJS.AES.decrypt(cryptedPassword, passPhrase).toString(CryptoJS.enc.Utf8);

}
