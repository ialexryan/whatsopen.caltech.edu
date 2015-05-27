// Copyright 2015 Alex Ryan
// (P.S. please don't judge how awful this JavaScript looks, it was compiled
// from much prettier TypeScript. TS is awesome!)
/// <reference path="classAddRemove.ts" />
var Interval = (function () {
    function Interval(open, close) {
        this.openingTime = open;
        this.closingTime = close;
    }
    Interval.prototype.getOpen = function () {
        return this.openingTime;
    };
    Interval.prototype.getOpenString = function () {
        return stringifyHour(this.openingTime);
    };
    Interval.prototype.getClose = function () {
        return this.closingTime;
    };
    Interval.prototype.getCloseString = function () {
        return stringifyHour(this.closingTime);
    };
    Interval.prototype.getInterval = function () {
        return [this.openingTime, this.closingTime];
    };
    Interval.prototype.getIntervalString = function () {
        return this.getOpenString() + " to " + this.getCloseString();
    };
    Interval.none = [new Interval(-1, -1)];
    return Interval;
})();
var Place = (function () {
    function Place(name, isOnCampus, Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday) {
        this.name = name;
        this.isOnCampus = isOnCampus;
        this.Sunday = Sunday;
        this.Monday = Monday;
        this.Tuesday = Tuesday;
        this.Wednesday = Wednesday;
        this.Thursday = Thursday;
        this.Friday = Friday;
        this.Saturday = Saturday;
    }
    Place.prototype.getName = function () {
        return this.name;
    };
    Place.prototype.getHoursForDay = function (d) {
        switch (d) {
            case 0: return this.Sunday;
            case 1: return this.Monday;
            case 2: return this.Tuesday;
            case 3: return this.Wednesday;
            case 4: return this.Thursday;
            case 5: return this.Friday;
            case 6: return this.Saturday;
        }
    };
    Place.prototype.getHoursForYesterday = function () {
        return this.getHoursForDay(((new Date()).getDay() - 1 + 7) % 7);
    };
    Place.prototype.getHoursForToday = function () {
        return this.getHoursForDay((new Date()).getDay());
    };
    Place.prototype.getHoursForTomorrow = function () {
        return this.getHoursForDay(((new Date()).getDay() + 1) % 7);
    };
    Place.prototype.isOpenNow = function () {
        var time = getExtendedTime();
        if (time > 2400) {
            var openings = this.getHoursForYesterday();
        }
        else {
            var openings = this.getHoursForToday();
        }
        for (var i = 0; i < openings.length; i++) {
            var x = openings[i];
            if ((time > x.getOpen()) && (time < x.getClose()))
                return true;
        }
        return false;
    };
    return Place;
})();
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
    var output;
    if ((hour == 2400) || (hour == 0)) {
        output = "midnight";
    }
    else if (hour == 1200) {
        output = "noon";
    }
    else if (hour > 2400) {
        hour -= 2400;
        output = insertColon(hour.toString()) + "am";
    }
    else if (hour > 1200) {
        hour -= 1200;
        output = insertColon(hour.toString()) + "pm";
    }
    else {
        output = insertColon(hour.toString()) + "am";
    }
    return output;
}
function stringifyHours(place) {
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
var places = [
    new Place("Open Kitchen", true, [new Interval(1000, 1400)], [new Interval(730, 1130), new Interval(1500, 1900)], [new Interval(730, 1130), new Interval(1500, 1900)], [new Interval(730, 1130), new Interval(1500, 1900)], [new Interval(730, 1130), new Interval(1500, 1900)], [new Interval(730, 1130), new Interval(1500, 1900)], [new Interval(1000, 1400)]),
    new Place("Chandler (Breakfast)", true, Interval.none, [new Interval(700, 1000)], [new Interval(700, 1000)], [new Interval(700, 1000)], [new Interval(700, 1000)], [new Interval(700, 1000)], Interval.none),
    new Place("Chandler (Sushi)", true, Interval.none, [new Interval(1100, 1330)], [new Interval(1100, 1330)], [new Interval(1100, 1330)], [new Interval(1100, 1330)], [new Interval(1100, 1330)], Interval.none),
    new Place("Chandler (Lunch)", true, Interval.none, [new Interval(1100, 1430)], [new Interval(1100, 1430)], [new Interval(1100, 1430)], [new Interval(1100, 1430)], [new Interval(1100, 1430)], Interval.none),
    new Place("Chandler (Pizza and Grill)", true, Interval.none, [new Interval(1100, 1530)], [new Interval(1100, 1530)], [new Interval(1100, 1530)], [new Interval(1100, 1530)], [new Interval(1100, 1530)], Interval.none),
    new Place("Red Door", true, Interval.none, [new Interval(730, 1730)], [new Interval(730, 1730)], [new Interval(730, 1730)], [new Interval(730, 1730)], [new Interval(730, 1730)], Interval.none),
    new Place("Broad Cafe", true, Interval.none, [new Interval(745, 1430)], [new Interval(745, 1430)], [new Interval(745, 1430)], [new Interval(745, 1430)], [new Interval(745, 1430)], Interval.none),
    new Place("House Dinner", true, Interval.none, [new Interval(1730, 1900)], [new Interval(1730, 1900)], [new Interval(1730, 1900)], [new Interval(1730, 1900)], [new Interval(1700, 1830)], Interval.none),
    new Place("Chouse (Grill)", true, [new Interval(2200, 2530)], [new Interval(2200, 2530)], [new Interval(2200, 2530)], [new Interval(2200, 2530)], [new Interval(2200, 2530)], Interval.none, Interval.none),
    new Place("Chouse", true, [new Interval(2200, 2600)], [new Interval(2200, 2600)], [new Interval(2200, 2600)], [new Interval(2200, 2600)], [new Interval(2200, 2600)], Interval.none, Interval.none),
    new Place("C-Store", true, [new Interval(1200, 2500)], [new Interval(1030, 2500)], [new Interval(1030, 2500)], [new Interval(1030, 2500)], [new Interval(1030, 2500)], [new Interval(1030, 2500)], [new Interval(1100, 2000)]),
    new Place("Package Annex", true, Interval.none, [new Interval(900, 1100), new Interval(1200, 1600), new Interval(2030, 2230)], [new Interval(900, 1100), new Interval(1200, 1600), new Interval(2030, 2230)], [new Interval(900, 1100), new Interval(1200, 1600), new Interval(2030, 2230)], [new Interval(900, 1100), new Interval(1200, 1600), new Interval(2030, 2230)], [new Interval(900, 1100), new Interval(1200, 1600), new Interval(2030, 2230)], Interval.none),
    new Place("Gym", true, [new Interval(800, 2000)], [new Interval(600, 2230)], [new Interval(600, 2230)], [new Interval(600, 2230)], [new Interval(600, 2230)], [new Interval(600, 2230)], [new Interval(800, 2000)]),
    new Place("Bookstore", true, Interval.none, [new Interval(830, 1730)], [new Interval(830, 1730)], [new Interval(830, 1730)], [new Interval(830, 1730)], [new Interval(830, 1730)], Interval.none),
];
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
    for (var i = 0; i < places.length; i++) {
        var place = places[i];
        var content = place.getName() + ": " + stringifyHours(place);
        var para = document.createElement("p");
        var text = document.createTextNode(content);
        para.appendChild(text);
        if (place.isOpenNow()) {
            addClass(para, "open");
            openPlaces.appendChild(para);
        }
        else {
            addClass(para, "closed");
            closedPlaces.appendChild(para);
        }
    }
}
window.onload = function () {
    redrawCurrentTime();
    setInterval(redrawCurrentTime, 5000);
    redrawPlaces();
    setInterval(redrawPlaces, 5000);
};
