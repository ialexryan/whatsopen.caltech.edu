// Copyright 2015 Alex Ryan
// (P.S. please don't judge how awful this JavaScript looks, it was compiled
// from much prettier TypeScript. TS is awesome!)
/// <reference path="classAddRemove.ts" />
/// <reference path="classes.ts" />
/// <reference path="data.ts" />
function getExtendedTime() {
    var date = new Date();
    var hour = date.getHours();
    var minute = date.getMinutes();
    if (hour < 5)
        hour += 24;
    var time = (hour * 100) + minute;
    return time;
}
function insertColon(time) {
    return time.slice(0, -2) + ":" + time.slice(-2, time.length);
}
function stringifyHour(hour) {
    var output = "";
    if ((hour == 2400) || (hour == 0)) {
        output = "midnight";
    }
    else if (hour == 1200) {
        output = "noon";
    }
    else if (hour > 2400) {
        hour -= 2400;
        if (hour < 100)
            hour += 1200;
        output += insertColon(hour.toString()) + "am";
    }
    else if (hour > 1200) {
        hour -= 1200;
        if (hour < 100)
            hour += 1200;
        output += insertColon(hour.toString()) + "pm";
    }
    else {
        if (hour < 100)
            hour += 1200;
        output = insertColon(hour.toString()) + "am";
    }
    return output;
}
function printUpcomingOpenings(place) {
    var hours = place.getHoursForToday();
    var time = getExtendedTime();
    var output = "";
    for (var i = 0; i < hours.length; i++) {
        var x = hours[i];
        if (time < x.getClose()) {
            output += x.getIntervalString() + " and ";
        }
    }
    if ((hours == Interval.none) || (output == "")) {
        var hours = place.getHoursForTomorrow();
        if (hours == Interval.none)
            return "closed for today and tomorrow";
        output += "[Tomorrow] ";
        for (var i = 0; i < hours.length; i++) {
            var x = hours[i];
            output += x.getIntervalString() + " and ";
        }
    }
    return output.slice(0, -5);
}
function redrawCurrentTime() {
    var date = new Date();
    var time = (date.getHours() * 100) + date.getMinutes();
    var timeString = "Current time is: " + stringifyHour(time);
    var currentTime = document.getElementById("currentTime");
    currentTime.innerHTML = timeString;
}
function redrawPlaces() {
    var openPlaces = document.getElementById("openPlaces");
    var closedPlaces = document.getElementById("closedPlaces");
    openPlaces.innerHTML = "";
    closedPlaces.innerHTML = "";
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
    for (var i = 0; i < placeGroup.length; i++) {
        var place = placeGroup[i];
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
        }
        else {
            addClass(row, "closed");
            closedPlaces.appendChild(row);
        }
    }
}
window.onload = function () {
    redrawCurrentTime();
    setInterval(redrawCurrentTime, 5000);
    redrawPlaces();
    setInterval(redrawPlaces, 5000);
};
