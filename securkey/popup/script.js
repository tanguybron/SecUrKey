// function onWindowLoad() {
//     var message = document.querySelector('#message');

//     chrome.tabs.query({ active: true, currentWindow: true }).then(function (tabs) {
//         var activeTab = tabs[0];
//         var activeTabId = activeTab.id;

//         return chrome.scripting.executeScript({
//             target: { tabId: activeTabId },
//             // injectImmediately: true,  // uncomment this to make it execute straight away, other wise it will wait for document_idle
//             func: DOMtoString,
//             // args: ['body']  // you can use this to target what element to get the html for
//         });

//     }).then(function (results) {
//         message.innerText = results[0].result;
//     }).catch(function (error) {
//         message.innerText = 'There was an error injecting script : \n' + error.message;
//     });
// }

// function DOMtoString(selector) {
//     if (selector) {
//         selector = document.querySelector(selector);
//         if (!selector) return "ERROR: querySelector failed to find node"
//     } else {
//         selector = document.documentElement;
//     }
//     return selector.outerHTML;
// }


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
    active_domain = activeTab.url.replace("https://", "").replace("http://", "").replace("www.", "").split("/")[0];
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
        password_found = document.getElementById("password").innerHTML.split(" : ")[1];
        if(username_found == undefined){
            window.location.href = "./not_found.html";
        }

        // window.onload = onWindowLoad;
        
        // else{
        //     var x = document.getElementById("username").value;
        //     if (x == ""){
        //         document.getElementById("username").value = username_found;
        //     }
        
        //     var y = document.getElementById("password").value;
        //     if (y == ""){
        //         document.getElementById("password").value = password_found;
        //     }      
        // }
    }catch(err){
        console.log(err);
    }
    
}