chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log("message received");
    if(request.username != undefined){
        document.querySelector("input[type='text']").value = request.username;
        // document.getElementById("username").value = request.username;
    }
    if(request.password != undefined){
        document.querySelector("input[type='password']").value = request.password;
        // document.getElementById("password").value = request.password;
    }
});