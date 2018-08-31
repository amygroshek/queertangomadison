/**
 * Fetch google calendar events and display in page.
 * @return none
 */
$(document).ready(function() {
    console.log('document ready');
    if ($('#calendar_parent').length > 0) {
        console.log('div for calednar events found');
        var calendarid = 'veg2nl14tb7grfpkhaevp3f8rk%40group.calendar.google.com';
        var apikey = 'AIzaSyDAmmTH7oX8pRBMCyDXVfKWI5m7U8myTnE';
        var now = Date.now();
        var events = $.ajax({
            url: 'https://www.googleapis.com/calendar/v3/calendars/' + calendarid +
            '/events?key=' + apikey,

        }).done(function(data) {
            console.log( "success" );
            console.log(data.items);
            var markup = '';
            var arr = data.items;
            var sorted = [];
            var count = 0;
            arr.forEach(function(el) {
                if (sorted.length < 20) {
                    console.log('sorted lenght is less than 20');
                    // If date is after today, add to array for sorting.
                    var calDate = Date.parse(el.start.dateTime);
                    console.log('calDate = ' + calDate);
                    if (calDate > now) {
                        sorted.push(el);
                    }
                }
            });
            console.log('sorted');
            console.log(sorted);

            if (sorted.length >= 1) {
                // Now write out the sorted items.
                sorted.forEach(function(el) {
                    console.log(el);
                    var date = new Date(el.start.dateTime);
                    markup += '<div class="event"><h3>' + el.summary + '</h3>' +
                                '<span class="date">' + date.toDateString() + '</span>' +
                                '<span class="location">' + el.location + '</span>' +
                                '<p>' + el.description + '</p>' +

                                '<a class="no-underline near-white bg-animate bg-near-black hover-bg-gray inline-flex items-center ma2 tc br0 pa3" aria-label="Link opens in a new window" target="_blank" style="color:white;" href="' + el.htmlLink + '" alt="Go to Google Calendar">View GCal</a></div>';
                    count++;
                });
            } else {
                markup = '<p>Sorry, no upcoming queer tango events at this time. Contact Amy to add your event or to schedule group or individual lessons.</p><a href="/contact/" class="no-underline near-white bg-animate bg-near-black hover-bg-gray inline-flex items-center ma2 tc br0 pa3" title="Contact">Contact</a>';
            }
            $(calendar_parent).html(markup);
        }).fail(function( jqXHR, textStatus, errorThrown) {
            console.log("Error " + textStatus + ', ' + errorThrown);
        });
    }



});
