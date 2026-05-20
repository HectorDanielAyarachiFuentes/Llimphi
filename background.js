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
