chrome.runtime.sendMessage("content_script.start");

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  switch (message) {
  case "service_worker.ping":
    console.log("service worker pings");
    break;
  case "service_worker.onSuspend":
    console.log("service worker is about to unload");
    break;
  default:
    console.warn("unhandled message", message);
  };
  sendResponse();
});
