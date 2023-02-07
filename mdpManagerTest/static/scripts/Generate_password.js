

function generate_password(letter,digits,punctuation,lengthPassword) 
{
    var listchar="";
    var password="";
    var lenPassword;

    if(letter)
    {
        listchar += "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ" ;
    }

    if(digits)
    {
        listchar += "0123456789" ;
    }

    if(punctuation)
    {
        listchar += "~`!@#$%^&*()_-+={[}]|\\:;\"'<,>.?/" ;
    }
    lenPassword=listchar.length

    for(var i=0;i<lengthPassword;i++)
    {
        password+=listchar.charAt(getRandomIntInclusive(0,listchar.length-1));
    }
    return password;
}



function getRandomIntInclusive(min, max) {
    const randomBuffer = new Uint32Array(1);

    window.crypto.getRandomValues(randomBuffer);

    let randomNumber = randomBuffer[0] / (0xffffffff + 1);

    return Math.floor(randomNumber * (max - min + 1)) + min;
}



function encrypting(password, passPhrase)
{
    return CryptoJS.AES.encrypt(password, passPhrase);
}



function decrypting(crypt, passPhrase)
{
    return CryptoJS.AES.decrypt(crypt, passPhrase);
}


var password=generate_password(1,1,1,16);
var encrypted=encrypting(password,"abc");

//var password2=generate_password(1,1,1,8);
// var encrypted2=encrypting(password2,"abcd");

var decrypted=decrypting(encrypted,"abc");
// var decrypted2=decrypting(encrypted2,"abcd");

console.log(password);
console.log(encrypted.ciphertext.toString());
// console.log(password2);
// console.log(encrypted2.ciphertext.toString());

console.log(decrypted.toString(CryptoJS.enc.Utf8));
// console.log(decrypted2.toString(CryptoJS.enc.Utf8));

// Problème de stockage :
// https://cryptojs.gitbook.io/docs/
// On doit stocker le encrypted pour decrypted
// Pb : l'encrypted stock la clé, l'iv, le salt et le cipher
// Ca implique que si un gars accède à la BDD, il choppe tout
// et n'a qu'a faire une attaque sur la phrase de passe