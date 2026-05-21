chrome.action.onClicked.addListener(function (tab) {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["starter.js"],
  });
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "getEditorHtml") {
    fetch(chrome.runtime.getURL('editor.html'))
      .then(response => response.text())
      .then(html => {
        sendResponse({ html: html });
      })
      .catch(error => {
        console.error("Error loading editor.html inside background:", error);
        sendResponse({ error: error.message });
      });
    return true; // Keep the message channel open for async response
  }
});

