Example: service worker unloads after given time of inactivity
====

In this example, we show a minimal version of service worker that gets loaded by
Chrome, then does nothing and get unloaded by Chrome. When content scripts
initiates (by refresh an existing page, navigate to a new URL, or open a new tab
with non-chrome URL), it wakes up the service worker.

````
    Service worker       the Browser         Content script

           '                   |
        unloaded               |
           '                   |               page open
           '                   |                   |
           '                   |                 init
           '                   |                   |
           '<------- "content_script.start" -------* t_0
           |                   |                   |
        loaded                 |                   |
           |                   |                   |
           |                   |                   |
           |                   |                   |
         idle                  |                   |
           |                   |                   |
           |                   |                   |
           |<--- onSubsepnd ---*                   |
           |                   |                   |
       t_1 *------ "service_worker.onSuspend" ---->|
           |                   |                   |
           '                   |                   |
       unloaded                |                   |
           '                   |                   |

````
