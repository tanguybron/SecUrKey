chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

    var activeTab = tabs[0];
    document.getElementById("url").innerHTML = activeTab.url;

});