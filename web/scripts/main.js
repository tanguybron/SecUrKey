window.onload = function() {
    const button = document.querySelector('.bouton');
    button.addEventListener('click', function() {
        const input_verif = document.querySelector('#verifpassword');
        const input = document.querySelector('#password');
        const verifpassword = input_verif.value;
        const password = input.value;
        if(password===verifpassword){
            console.log("mdp égaux");
            console.log(CryptoJS.SHA256(password).toString());
            // A faire : 
            // Enregistrer password dans LocalSession pour pouvoir ensuite l'utiliser comme clef de chiffrement
        }else{
            console.log("mdp différents");
        }
    });
};
