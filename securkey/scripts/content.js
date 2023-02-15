const username = document.querySelector("username");
const password = document.querySelector("password");

if(username && password){
    username.value = "mathis"
    password.value = "mathis"
    document.forms[0].submit()
}