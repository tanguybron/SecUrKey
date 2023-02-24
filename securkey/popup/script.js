chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    document.getElementById("url").innerHTML = "url : " + activeTab.url;
});

// get source code of the page https://localhost
const xhr = new XMLHttpRequest();
const url='https://localhost/passwords';
xhr.open("GET", url);
xhr.send();
xhr.onreadystatechange = (e) => {
    data = xhr.responseText;
    console.log(data);
}