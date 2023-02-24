chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    active_domain = activeTab.url.replace("https://", "").replace("http://", "").replace("www.", "").replace("/", "");
    document.getElementById("url").innerHTML = "url : " + active_domain;
});

// get source code of the page https://localhost
const xhr = new XMLHttpRequest();
const url='https://localhost/passwords_json';
xhr.open("GET", url);
xhr.send();
xhr.onreadystatechange = (e) => {
    data = xhr.responseText;
    var json = JSON.parse(data);
    //account_obj = JSON.parse(json);
    for(var i = 0; i < json.length; i++) {
        if(json[i].fields.website == active_domain){
            document.getElementById("username").innerHTML = "username : " + json[i].fields.username;
            document.getElementById("password").innerHTML = "password : " + json[i].fields.password;
        }
    }
}