Example: service worker unloads after given time of inactivity
====

In this example, we showcase how background page service worker can be woken up
by chrome.alarms events. The diagrams below demonstrate two cases, first one
being that the user keeps their laptop on when the alarms went off, and the
second showing how it looks like if their laptop was off during that
time. Either way the alrams event wakes up the service worker, and then the
service worker sends out an notification. It also re-register a new alarm every
time it wakes up.

````
    Service worker                            the Browser

           |  alarms.create()                      |
        t0 *-------------------------------------->|
           |                                       |
         idle                                      |
           |                                       |
        unloaded                                   |
           '                                       |
           '                                       |
           '                                       |
           '                                       |
           '                                       |
           '                       alarms.onAlarm  |
           '<--------------------------------------* t1 = t0 + delayInMinutes
           |                                       |
        loaded                                     |
           |                                       |
           |  notifications.create() (this happens in onAlarm callback)
           *-------------------------------------->|
           |                                       |
           |  alarms.create()                      |
           *-------------------------------------->|
           |                                       |

````

````
    Service worker                            the Browser

           |  alarms.create()                      |
        t0 *-------------------------------------->|
           |                                       |
         idle                                      |
           |                                       |
        unloaded                                   |
           '                                       |
           '                                       |
           '                                       |
           -                                       -

              the user put their laptop on sleep

           -                                       - Chrome will hold the alarms
           '                                       | event for arbitary amount
           '                                       | of time
           '                       alarms.onAlarm  |
           '<--------------------------------------* t1
           |                                       |
        loaded                                     |
           |                                       |
           |  notifications.create() (this happens in onAlarm callback)
           *-------------------------------------->|
           |                                       |
           |  alarms.create()                      |
           *-------------------------------------->|
           |                                       |

````
