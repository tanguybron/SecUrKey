function getCookies(domain, name, callback) {
    chrome.cookies.get({"url": domain, "name": name}, function(cookie) {
        if(callback) {
            try{
                callback(cookie.value);
            }catch(err){
                callback(null)
            }
        }
    });
}

function change_state(){
    getCookies("https://localhost", "logged_in_cookie", function(cookie) {
        if(cookie != null){
            getCookies("https://localhost", "sessionid", function(cookie) {
                if(cookie == null){
                    chrome.action.setBadgeText({
                        text: "OFF",
                    });
                    chrome.action.setBadgeBackgroundColor(
                        { color: 'red' }
                    );
                }else{
                    chrome.action.setBadgeText({
                        text: "ON",
                    });
                    chrome.action.setBadgeBackgroundColor(
                        { color: 'green' }
                    );
                }
            });
        }
        
    });
}

chrome.tabs.onActivated.addListener(() => {
    change_state();
});

chrome.tabs.onUpdated.addListener(() => {
    chrome.action.setBadgeText({
      text: "OFF",
    });
    chrome.action.setBadgeBackgroundColor(
       { color: 'red'}
    )
    change_state();
});


chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
      text: "OFF",
    });
    chrome.action.setBadgeBackgroundColor(
       { color: 'red'}
    )
});

chrome.webRequest.onBeforeRequest.addListener(function(details){
    if(details.method == "POST"){
        try{
            if(details.requestBody.formData.password != undefined){
                username=details.requestBody.formData.username[0];
                password=details.requestBody.formData.password[0];
                url=details.url.replace("https://", "").replace("http://", "").replace("www.", "").split("/")[0];
                // chrome.runtime.sendMessage({ username: username, password: password, url : url },)
                // console.log("message sent");
            }
        }
       catch{

        }
        
    }
}, {urls:["<all_urls>"]},
['requestBody']
);
