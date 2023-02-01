window.onload = function() {
    const button = document.querySelector('.bouton');
    button.addEventListener('click', function() {
        const input_verif = document.querySelector('#verifpassword');
        const input = document.querySelector('#password');
        const verifpassword = input_verif.value;
        const password = input.value;
        if(password===verifpassword){
            console.log(CryptoJS.SHA256(password).toString());
        }else{
            console.log("mdp différents");
        }
    });
};
