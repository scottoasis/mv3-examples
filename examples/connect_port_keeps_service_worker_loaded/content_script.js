var epoch, port;
console.log("hello from content script");

epoch = Date.now();
port = chrome.runtime.connect();
setTimeout(
  () => {
    port.disconnect();
    port = chrome.runtime.connect();
    port.onDisconnect.addListener(() => {
      let millisElapsed = Date.now() - epoch;
      console.log("Disconnected from service worker, total seconds elapsed = ", millisElapsed / 1000);
    });
  },
  // a timer slightly less than 5 minutes
  290000
);
