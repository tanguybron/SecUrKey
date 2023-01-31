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