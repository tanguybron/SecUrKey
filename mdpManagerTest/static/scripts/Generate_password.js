function Generate_password() 
{
    var passwordInput = document.getElementById("password");
    var letter = document.getElementById("toggleLetter").value;
    var digits = document.getElementById("toggleNumber").value;
    var punctuation = document.getElementById("toggleSpecial").value;
    var lengthPassword = document.getElementById("passwordLength").value;
    var listchar="";
    var password="";

    var lenPassword;

    if(letter==1)
    {
        listchar += "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ" ;
    }

    if(digits==1)
    {
        listchar += "0123456789" ;
    }CryptoJS

    if(punctuation==1)
    {
        listchar += "~`!@#$%^&*()_-+={[}]|\\:;\"'<,>.?/" ;
    }
    lenPassword=listchar.length

    for(var i=0;i<lengthPassword;i++)
    {
        password+=listchar.charAt(getRandomIntInclusive(0,listchar.length-1));
    }
    passwordInput.type = "text";
    document.getElementById("password").value = password;
}

function Generate_password_default() 
{
    console.log("chesh2");

    var passwordInput = document.getElementById("password");
    var listchar="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~`!@#$%^&*()_-+={[}]|\\:;\"'<,>.?/";
    var password="";
    var lenPassword=listchar.length;

    for(var i=0;i<16;i++)
    {
        password+=listchar.charAt(getRandomIntInclusive(0,listchar.length-1));
    }
    passwordInput.type = "text";
    document.getElementById("password").value = password;
}



function getRandomIntInclusive(min, max) {
    const randomBuffer = new Uint32Array(1);

    window.crypto.getRandomValues(randomBuffer);

    let randomNumber = randomBuffer[0] / (0xffffffff + 1);

    return Math.floor(randomNumber * (max - min + 1)) + min;
}



function encrypting()
{
    var password = document.getElementById("password").value;
    var passPhrase="shesh";
    var encryptionResult = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(password), passPhrase);
    document.getElementById("password").value = ""+encryptionResult;

    console.log(CryptoJS.AES.decrypt(encryptionResult, passPhrase));

    // var result = confirm("Are you sure to delete?");

}