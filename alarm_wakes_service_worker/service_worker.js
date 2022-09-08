chrome.notifications.onClicked.addListener(
  notificationId => {
    console.log("clicked on notification id = ", notificationId);
    chrome.notifications.clear(notificationId);
  });

let delayInMinutes = 1;

chrome.alarms.getAll((alarms) => {
  if (alarms.length == 0) {
    let eventTime = Date.now() + delayInMinutes * 60000;
    chrome.alarms.create(new Date(eventTime).toString(), {delayInMinutes: delayInMinutes});
  }
});

chrome.alarms.onAlarm.addListener(
  alarm => {
    console.log("alarm went off", alarm);
    let eventTime = new Date(alarm.name);
    let delayedMillis = Date.now() - eventTime;
    chrome.notifications.create(
      "wakeup",
      {
        type: "basic",
        iconUrl: "/icon.png",
        title: "Alarm went off",
        message: "The alarm was delayed for " + Math.floor(delayedMillis / 1000).toString() + " seconds",
        requireInteraction: true,
      },
      notificationId => console.log("notification created id = ", notificationId)
    );
  });
