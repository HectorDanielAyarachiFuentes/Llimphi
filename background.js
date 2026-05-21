chrome.action.onClicked.addListener(function (tab) {
  // Evitar intentar inyectar scripts en páginas restringidas del navegador
  if (!tab.url || tab.url.startsWith("chrome://") || tab.url.startsWith("about:") || tab.url.startsWith("moz-extension://")) {
    return;
  }

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["starter.js"],
  });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type === 'WYP_FETCH_UNSPLASH_BG') {
    fetch(request.url)
      .then(response => {
        if (!response.ok) {
          throw new Error('HTTP error! status: ' + response.status);
        }
        return response.json();
      })
      .then(data => {
        if (data && data.errors) {
          sendResponse({ success: false, error: data.errors.join(', ') });
        } else {
          sendResponse({ success: true, data: data });
        }
      })
      .catch(err => {
        sendResponse({ success: false, error: err.message });
      });
    return true; // Keep the message channel open for asynchronous response
  }
});
