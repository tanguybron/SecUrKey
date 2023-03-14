function get_pass(active_domain){
    // get source code of the page https://localhost/passwords_json
    const xhr = new XMLHttpRequest();
    console.log("2: "+active_domain);
    console.log("3: "+active_domain);
    const url='https://localhost/passwords_json/'+active_domain;
    xhr.open("GET", url);
    xhr.send();
    xhr.onreadystatechange = (e) => {
        data = xhr.responseText;
        var json;

        json = JSON.parse(data);
        for(var i = 0; i < json.length; i++) {
            console.log("4: "+ active_domain);
            if(json[i].fields.website == active_domain){
                document.getElementById("username").innerHTML = "username : " + json[i].fields.username;
                document.getElementById("password").innerHTML = "password : " + json[i].fields.password;
            }
        }
        try{
            username_found = document.getElementById("username").innerHTML.split(" : ")[1];
            password_found = document.getElementById("password").innerHTML.split(" : ")[1];
            if(username_found == undefined){
                window.location.href = "./not_found.html";
            }else{
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    chrome.tabs.sendMessage(
                        tabs[0].id,
                        { username: username_found, password: password_found },
                    );
                });        
            }
            

        }catch(err){
            console.log(err);
        }
        
    }

}

button = document.getElementById("button_login");
button.addEventListener("click", function() {
    chrome.tabs.create({'url': "https://localhost/signin"});
});

// chrome.browserAction.onClicked.addListener(function() {
//     chrome.tabs.create({'url': "https://localhost/signin"});
// });

active_domain = "";
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
    var active_domain = activeTab.url.replace("https://", "").replace("http://", "").replace("www.", "").split("/")[0];
    console.log("1: " + active_domain);
    get_pass(active_domain);
});