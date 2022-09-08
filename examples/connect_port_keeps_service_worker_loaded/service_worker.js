chrome.runtime.onConnect.addListener(
  port => {
    console.log("onConnect from tab ", port);
  });
