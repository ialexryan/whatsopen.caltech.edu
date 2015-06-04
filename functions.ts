// Copyright 2015 Alex Ryan
// (P.S. please don't judge how awful this JavaScript looks, it was compiled
// from much prettier TypeScript. TS is awesome!)

/// <reference path="classAddRemove.ts" />
/// <reference path="classes.ts" />
/// <reference path="data.ts" />

/* This function returns a time between 0500 and 2859.
   It seems that nothing is ever open around 5am, so I thought that
   would be a good cutoff time for the day change. */
function getExtendedTime(): number {
    var date: Date = new Date();
    var hour: number = date.getHours();
    var minute: number = date.getMinutes();
    // I'm arbitrarily deciding that any times before 4:59am belong to the previous day.
    if (hour < 5) hour += 24;
    var time: number = (hour * 100) + minute;
    return time;
}

/* This function takes a string and inserts a colon
   two characters from the end.  "1030" -> "10:30" */
function insertColon(time: string): string {
    return time.slice(0, -2) + ":" + time.slice(-2, time.length);
}

/* This function attempts to pretty-print a number between 0000 and 2900
  as an hour string.
  1030 -> "10:30am"
  2400 -> "midnight"
  2545 -> "1:45am"  */
function stringifyHour(hour: number): string {
    var output: string = "";
    if ((hour == 2400) || (hour == 0)) {
        output = "midnight";
    } else if (hour == 1200) {
        output = "noon";
    } else if (hour > 2400) {
        hour -= 2400;
        if (hour < 100) hour += 1200;
        output += insertColon(hour.toString()) + "am";
    } else if (hour > 1200) {
        hour -= 1200;
        if (hour < 100) hour += 1200;
        output += insertColon(hour.toString()) + "pm";
    } else {
        if (hour < 100) hour += 1200;
        output = insertColon(hour.toString()) + "am";
    }
    return output;
}

/* This function attempts to pretty-print all the upcoming open times for a
   given Place. If there are none remaining today, it prints tomorrow's. */
function printUpcomingOpenings(place: Place): string {

    var hours = place.getHoursForToday();
    var time: number = getExtendedTime();
    var output: string = "";

    for (var i=0; i<hours.length; i++) {
        var x: Interval = hours[i];
        // Add all of the intervals that haven't ended yet to the output
        if (time < x.getClose()) {
            output += x.getIntervalString() + " and ";
        }
    }
    // If there are no intervals today, or they all already ended,
    // let's show what's open tomorrow.
    if ((hours == Interval.none) || (output == "")) {
        var hours = place.getHoursForTomorrow();
        if (hours == Interval.none) return "closed for today and tomorrow";
        output += "[Tomorrow] "
        for (var i=0; i<hours.length; i++) {
            var x: Interval = hours[i];
            output += x.getIntervalString() + " and ";
        }
    }
    return output.slice(0, -5);  //remove that annoying last " and "
}


/* This function recomputes the current time and updates the DOM */
function redrawCurrentTime(): void {
    var date: Date = new Date();
    var time: number = (date.getHours() * 100) + date.getMinutes();
    var timeString: string = "Current time is: " + stringifyHour(time);
    var currentTime = document.getElementById("currentTime");
    currentTime.innerHTML = timeString;
}


/* This function recomputes which places are open and closed and
   when their next opening times are, and updates the DOM */
function redrawPlaces(): void {
    var openPlaces = document.getElementById("openPlaces");
    var closedPlaces = document.getElementById("closedPlaces");
    openPlaces.innerHTML = "";
    closedPlaces.innerHTML = "";

    /* Determine which group of locations should be displayed */
    var placeGroup = [];

    if (document.getElementById("foodPlaces").checked) {
        placeGroup = placeGroup.concat(foodPlaces);
    }

    if (document.getElementById("libraryPlaces").checked) {
        placeGroup = placeGroup.concat(libraryPlaces);
    }

    if (document.getElementById("miscPlaces").checked) {
        placeGroup = placeGroup.concat(miscPlaces);
    }

    for (var i=0; i<placeGroup.length; i++) {
        var place: Place = placeGroup[i];

        var row = document.createElement("tr");
        var name = document.createElement("td");
        var spacer = document.createElement("td");
        var hours = document.createElement("td");
        var nametext = document.createTextNode(place.getName());
        var hourstext = document.createTextNode(printUpcomingOpenings(place));
        name.appendChild(nametext);
        hours.appendChild(hourstext);
        row.appendChild(name);
        row.appendChild(spacer);
        row.appendChild(hours);

        if (place.isOpenNow()) {
            addClass(row, "open");
            openPlaces.appendChild(row);
        } else {
            addClass(row, "closed");
            closedPlaces.appendChild(row);
        }
    }
}

/* This is the "main" function of sorts, it gets called when the page loads.
   It sets the places list and time to refresh every 5 seconds. */
window.onload = function() {
    // Populate the Current Time field
    redrawCurrentTime();
    setInterval(redrawCurrentTime, 5000);

    // Populate the list of places
    redrawPlaces();
    setInterval(redrawPlaces, 5000);
}
