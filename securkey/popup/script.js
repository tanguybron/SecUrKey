try{
    document.getElementById("button_username").addEventListener('click' , function() {
        navigator.clipboard.writeText(document.getElementById("username").innerHTML.split(" : ")[1]);
        document.getElementById("button_username").innerHTML = "copied";
    });

    document.getElementById("button_password").addEventListener('click' , function() {
        navigator.clipboard.writeText(document.getElementById("password").innerHTML.split(" : ")[1]);
        document.getElementById("button_password").innerHTML = "copied";
    });
}catch(err){ // si dans page not_found.html 
    console.log(err);
}

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    active_domain = activeTab.url.replace("https://", "").replace("http://", "").replace("www.", "").replace("/", "");
});

// get source code of the page https://localhost
const xhr = new XMLHttpRequest();
const url='https://localhost/passwords_json';
xhr.open("GET", url);
xhr.send();
xhr.onreadystatechange = (e) => {
    data = xhr.responseText;
    var json;
    json = JSON.parse(data);
    for(var i = 0; i < json.length; i++) {
        if(json[i].fields.website == active_domain){
            document.getElementById("username").innerHTML = "username : " + json[i].fields.username;
            document.getElementById("password").innerHTML = "password : " + json[i].fields.password;
        }
    }
    try{
        username_found = document.getElementById("username").innerHTML.split(" : ")[1];
        if(username_found == undefined){
            window.location.href = "./not_found.html";
        }
    }catch(err){
        console.log(err);
    }
    
}

