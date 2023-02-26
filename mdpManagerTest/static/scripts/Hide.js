const btn3List = document.querySelectorAll('.hide');
btn3List.forEach(btn3 => {
  const icon = btn3.querySelector('i');
  const password = btn3.closest('.account').querySelector('.password');
  password.classList.add('hidden'); 
  let passwordShown = false;
  btn3.addEventListener('click', () => {
    passwordShown = !passwordShown;
    if (passwordShown) {
      password.classList.remove('hidden');
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');
    } else {
      password.classList.add('hidden');
      icon.classList.remove('fa-eye');
      icon.classList.add('fa-eye-slash');
    }
  });
});