let foregroundTabIds = [];

let intervalId = setInterval(() => {
  if (foregroundTabIds.length > 0) {
    let tabId = foregroundTabIds[0];
    chrome.tabs.sendMessage(tabId, "service_worker.ping");
    clearInterval(intervalId);
    intervalId = null;
  }
}, 1000);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message) {
  case "content_script.start":
    let tabId = sender.tab.id;
    foregroundTabIds = foregroundTabIds.concat([tabId]);
    console.log("content script init on tab ", tabId);
    break;
  default:
    console.warn("unhandled message", message);
  }
  sendResponse();
});

chrome.runtime.onSuspend.addListener(async () => {
  await chrome.storage.local.set({lastSessionSuspendAt: Date.now()});
  await Promise.all(
    foregroundTabIds
      .map(tabId => 
           chrome.tabs.sendMessage(
             tabId,
             "service_worker.onSuspend"
           )
          )
  );
});
