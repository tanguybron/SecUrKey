console.log("ok");

// get source code of the page https://localhost
const xhr = new XMLHttpRequest();
const url='https://localhost/passwords_json';
let username_found;
let password_found;
xhr.open("GET", 'https://localhost/passwords_json',false);
xhr.withCredentials = true;
xhr.setRequestHeader('Cookie', 'sessionid=zm27edk87mgwnm3qbte1t3o4ebebaiqm');
xhr.send();
xhr.onreadystatechange = (e) => {
    console.log("state changed")
    data = xhr.responseText;
    console.log(data);
    var json;
    json = JSON.parse(data);
    console.log(json);
    for(var i = 0; i < json.length; i++) {
        if(json[i].fields.website == active_domain){
            username_found = json[i].fields.username;
            console.log(username_found);
            password_found = json[i].fields.password;
        }
    }
    try{    
        var x = document.getElementById("username").value;
        if (x == ""){
            document.getElementById("username").value = username_found;
        }

        var y = document.getElementById("password").value;
        if (y == ""){
            document.getElementById("password").value = password_found;
        }      
        
    }catch(err){
        console.log(err);
    }
}