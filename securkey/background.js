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