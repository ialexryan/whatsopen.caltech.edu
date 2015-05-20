// From http://www.kirupa.com/html5/setting_css_styles_using_javascript.htm
function addClass(element, classToAdd) {
    var currentClassValue = element.className;
    if (currentClassValue.indexOf(classToAdd) == -1) {
        if ((currentClassValue == null) || (currentClassValue === "")) {
            element.className = classToAdd;
        }
        else {
            element.className += " " + classToAdd;
        }
    }
}
function removeClass(element, classToRemove) {
    var currentClassValue = element.className;
    if (currentClassValue == classToRemove) {
        element.className = "";
        return;
    }
    var classValues = currentClassValue.split(" ");
    var filteredList = [];
    for (var i = 0; i < classValues.length; i++) {
        if (classToRemove != classValues[i]) {
            filteredList.push(classValues[i]);
        }
    }
    element.className = filteredList.join(" ");
}
var Interval = (function () {
    function Interval(open, close) {
        this.openingTime = open;
        this.closingTime = close;
    }
    Interval.prototype.getOpen = function () {
        return this.openingTime;
    };
    Interval.prototype.getOpenString = function () {
        return insertColon((this.getOpen()).toString());
    };
    Interval.prototype.getClose = function () {
        return this.closingTime;
    };
    Interval.prototype.getCloseString = function () {
        return insertColon((this.getClose()).toString());
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
    Place.prototype.getHoursForToday = function () {
        return this.getHoursForDay((new Date()).getDay());
    };
    Place.prototype.isOpenNow = function () {
        var date = new Date();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var time = (hour * 100) + minute;
        var openings = this.getHoursForToday();
        for (var i = 0; i < openings.length; i++) {
            var x = openings[i];
            if ((time > x.getOpen()) && (time < x.getClose()))
                return true;
        }
        return false;
    };
    return Place;
})();
function stringifyHours(hours) {
    if (hours == Interval.none)
        return "closed today";
    var output = "";
    for (var i = 0; i < hours.length; i++) {
        var x = hours[i];
        output += x.getIntervalString() + " and ";
    }
    return output.slice(0, -5);
}
function insertColon(time) {
    return time.slice(0, -2) + ":" + time.slice(-2, time.length);
}
var places = [
    new Place("Open Kitchen", true, Interval.none, [new Interval(730, 1130), new Interval(1500, 1900)], [new Interval(730, 1130), new Interval(1500, 1900)], [new Interval(730, 1130), new Interval(1500, 1900)], [new Interval(730, 1130), new Interval(1500, 1900)], [new Interval(730, 1130), new Interval(1500, 1900)], Interval.none),
    new Place("Chandler Breakfast", true, Interval.none, [new Interval(700, 1000)], [new Interval(700, 1000)], [new Interval(700, 1000)], [new Interval(700, 1000)], [new Interval(700, 1000)], Interval.none),
    new Place("Red Door", true, Interval.none, [new Interval(730, 1730)], [new Interval(730, 1730)], [new Interval(730, 1730)], [new Interval(730, 1730)], [new Interval(730, 1730)], Interval.none),
    new Place("Broad Cafe", true, Interval.none, [new Interval(745, 1430)], [new Interval(745, 1430)], [new Interval(745, 1430)], [new Interval(745, 1430)], [new Interval(745, 1430)], Interval.none),
];
function updateCurrentTime() {
    var currentTime = document.getElementById("currentTime");
    currentTime.innerText = "Current time is: " + (new Date()).toLocaleTimeString('en-US', { hour12: false });
}
function updateHighlighting() {
    var openPlaces = document.getElementById("openPlaces");
    var closedPlaces = document.getElementById("closedPlaces");
    openPlaces.innerHTML = "";
    closedPlaces.innerHTML = "";
    for (var i = 0; i < places.length; i++) {
        var place = places[i];
        var content = place.getName() + ": " + stringifyHours(place.getHoursForToday());
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
    updateCurrentTime();
    setInterval(updateCurrentTime, 5000);
    updateHighlighting();
    setInterval(updateHighlighting, 5000);
};
