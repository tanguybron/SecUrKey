// console.log("ok");

// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     var activeTab = tabs[0];
//     active_domain = activeTab.url.replace("https://", "").replace("http://", "").replace("www.", "").split("/")[0];
// });


// // get source code of the page https://localhost/passwords_json
// const xhr = new XMLHttpRequest();
// const url='https://localhost/passwords_json';
// xhr.open("GET", url);
// xhr.send();
// xhr.onreadystatechange = (e) => {
//     data = xhr.responseText;
//     var json;
//     json = JSON.parse(data);
//     for(var i = 0; i < json.length; i++) {
//         if(json[i].fields.website == active_domain){
//             document.getElementById("username").innerHTML = "username : " + json[i].fields.username;
//             document.getElementById("password").innerHTML = "password : " + json[i].fields.password;
//         }
//     }
//     try{
//         username_found = document.getElementById("username").innerHTML.split(" : ")[1];
//         password_found = document.getElementById("password").innerHTML.split(" : ")[1];
//         if(username_found == undefined){
//             window.location.href = "./not_found.html";
//         }else{
//             console.log("username_found : " + username_found);
//             console.log("password_found : " + password_found);
//             chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//                 chrome.tabs.sendMessage(
//                     tabs[0].id,
//                     { username: username_found, password: password_found },
//                 );
//             });        
//         }
        

//     }catch(err){
//         console.log(err);
//     }
    
// }
// // chrome.tabs.onUpdated.addListener(function() {
// //     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
// //         var activeTab = tabs[0];
// //         active_domain = activeTab.url.replace("https://", "").replace("http://", "").replace("www.", "").split("/")[0];
// //     });
    
// //     // get source code of the page https://localhost/passwords_json
// //     const xhr = new XMLHttpRequest();
// //     const url='https://localhost/passwords_json';
// //     xhr.open("GET", url);
// //     xhr.send();
// //     xhr.onreadystatechange = (e) => {
// //         data = xhr.responseText;
// //         var json;
// //         json = JSON.parse(data);
// //         for(var i = 0; i < json.length; i++) {
// //             if(json[i].fields.website == active_domain){
// //                 document.getElementById("username").innerHTML = "username : " + json[i].fields.username;
// //                 document.getElementById("password").innerHTML = "password : " + json[i].fields.password;
// //             }
// //         }
// //         try{
// //             username_found = document.getElementById("username").innerHTML.split(" : ")[1];
// //             password_found = document.getElementById("password").innerHTML.split(" : ")[1];
// //             if(username_found == undefined){
// //                 window.location.href = "./not_found.html";
// //             }else{
// //                 chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
// //                     chrome.tabs.sendMessage(
// //                         tabs[0].id,
// //                         { username: username_found, password: password_found },
// //                     );
// //                 });
                    
// //                 }
            
    
// //         }catch(err){
// //             console.log(err);
// //         }
        
// //     }
// // })



// // chrome.action.onClicked.addListener(async (tab) => {
//     // alert("ok");
// // });

