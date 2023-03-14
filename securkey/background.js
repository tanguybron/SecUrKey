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

chrome.tabs.onUpdated.addListener(() => {
    console.log("clicked");
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
});

chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
      text: "OFF",
    });
    chrome.action.setBadgeBackgroundColor(
       { color: 'red'}
    )
});