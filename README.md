# eventCalendar
JQuery plugin calendar to show events on particular day into your webpage
```js
    <div class="eventcalendar"></div>
    
    <script type="text/javascript" src="js/event_calendar.js"></script>
    <script type="application/javascript">
        $(document).ready(function () {
            $(".eventcalendar").eventcalendar({
              //  options
            });
        });
    </script>
```
## options:
##### *width* (Integer): 
  This will set the calendar width in (px) format. It wont exceed the window width and wont reduce below the minumum width.
##### *height* (Integer): 
  This will set the calendar height in (px) format. It wont exceed the window height and wont reduce below the minumum height.
##### *month* (Integer): 
  This will take the calendar to that particular month.
##### *year* (Integer): 
  This will take the calendar to that particular year.
