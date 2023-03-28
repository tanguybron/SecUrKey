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
/*     encrypting();
 */}

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
/*     encrypting();
 */}



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

    //document.getElementById("encryptedPassword").value = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(password), passPhrase);
    //document.getElementById("password").value = document.getElementById("encryptedPassword").value;
    
    //console.log(document.getElementById("password").value);
    /*     console.log(document.getElementById("encryptedPassword").value); */
    //console.dir(document.getElementById("encryptedPassword").value);

    var encryptionResult = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(password), passPhrase);

    // Mettre à jour les champs cachés avec les valeurs de key, iv et salt
    var key = JSON.stringify(encryptionResult.key);

    var iv = JSON.stringify(encryptionResult.iv);

    var salt = JSON.stringify(encryptionResult.salt);

    console.log("Encryption result:");
    console.log("- $super: " + JSON.stringify(encryptionResult.$super));
    console.log("- ciphertext: " + encryptionResult.ciphertext);
    console.log("- key: " + JSON.stringify(encryptionResult.key));
    console.log("- iv: " + JSON.stringify(encryptionResult.iv));
    console.log("- salt: " + JSON.stringify(encryptionResult.salt));
    console.log("- algorithm: " + encryptionResult.algorithm);
    console.log("- mode: " + encryptionResult.mode);
    console.log("- padding: " + encryptionResult.padding);
    
    document.getElementById("encryptedPassword").value = encryptionResult.ciphertext;
    document.getElementById("password").value = encryptionResult.ciphertext;


    document.getElementById("key").value = key;
    document.getElementById("iv").value = iv;
    document.getElementById("salt").value = salt;

    console.log(document.getElementById("key").value);
    console.log(document.getElementById("iv").value);
    console.log(document.getElementById("salt").value);

    var result = confirm("Are you sure to delete?");
    if(result){
    }

}


function decrypting(cryptedPassword)
{
    //============================================================================
    // ligne a rajouter dans le .html pour stocker le crypter ou le decrypter :
    //                         <div id="encryptedPassword"></div>
    //                         <div id="decryptedPassword"></div>
    //============================================================================
    //var crypt = document.getElementById("encryptedPassword").value;
    var passPhrase="shesh";
    return CryptoJS.AES.decrypt(cryptedPassword, passPhrase).toString(CryptoJS.enc.Utf8);

    //document.getElementById("decryptedPassword").value = decrypted.toString(CryptoJS.enc.Utf8);
/*     console.log(decrypted.toString(CryptoJS.enc.Utf8));
 */}




/* var password=generate_password(1,1,1,16);

var encrypted=encrypting(password,"abc");

var decrypted=decrypting(encrypted,"abc");

console.log(password);

console.log(encrypted.ciphertext.toString());

console.log(decrypted.toString(CryptoJS.enc.Utf8));

// Problème de stockage :
// https://cryptojs.gitbook.io/docs/
// On doit stocker le encrypted pour decrypted
// Pb : l'encrypted stock la clé, l'iv, le salt et le cipher
// Ca implique que si un gars accède à la BDD, il choppe tout
// et n'a qu'a faire une attaque sur la phrase de passe */