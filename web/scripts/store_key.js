window.onload = function() {
    const button = document.querySelector('.bouton');
    button.addEventListener('click', function() {
        const input = document.querySelector('#password');
        const password = input.value;
        sessionStorage.setItem("password",password);
        //localStorage.setItem("password",password);
    });
};