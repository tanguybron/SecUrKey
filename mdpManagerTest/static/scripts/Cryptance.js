function encrypting()
{
    var password = document.getElementById("password").value;
    var passPhrase="shesh";
    var encryptionResult = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(password), passPhrase);
    document.getElementById("password").value = ""+encryptionResult;
    console.log(""+encryptionResult);
    
}

function decrypting(cryptedPassword)
{
    var passPhrase="shesh";
    document.getElementById("decrypted").innerHTML = CryptoJS.AES.decrypt(cryptedPassword, passPhrase).toString(CryptoJS.enc.Utf8);

}