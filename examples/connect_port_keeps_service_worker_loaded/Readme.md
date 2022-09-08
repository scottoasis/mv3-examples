Example: keep service worker running with open connect() ports
====

````
    Service worker       the Browser         Content script

           '                   |
           '   user click to inject content script
           '                   *------------------>| t0
           '                   |                 init
           '                   |                   |
           '<-------------- connect() -------------*
           |                   |                   |
        loaded                 |                   |
           |                   |                   |
           |                   |           a timer slightly
           |                   |         less than 5 minutes
         idle                  |                   |
           |                   |                   |
           |                   |                   |
           |<-------------- connect() -------------*
           |                   |                   |
           |                   |                   |
         idle                  |                   |
           |                   |                   |
      (5 minutes)              |                   |
           |                   |                   |
           |                   |                   |
           |      suspend      |                   |
        t2 |<------------------*                   |
           '                   | port.onDisconnect |
           '                   *------------------>| t3
           '                   |                   |

````
