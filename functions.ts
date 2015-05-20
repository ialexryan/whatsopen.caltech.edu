// From http://www.kirupa.com/html5/setting_css_styles_using_javascript.htm

function addClass(element, classToAdd) {
    var currentClassValue = element.className;

    if (currentClassValue.indexOf(classToAdd) == -1) {
        if ((currentClassValue == null) || (currentClassValue === "")) {
            element.className = classToAdd;
        } else {
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

    for (var i = 0 ; i < classValues.length; i++) {
        if (classToRemove != classValues[i]) {
            filteredList.push(classValues[i]);
        }
    }

    element.className = filteredList.join(" ");
}



class Interval {

    static none: [Interval] = [new Interval(-1, -1)];

    private openingTime: number;
    private closingTime: number;

    constructor(open: number, close: number) {
        this.openingTime = open;
        this.closingTime = close;
    }

    getOpen(): number {
        return this.openingTime;
    }

    getOpenString(): string {
        return insertColon((this.getOpen()).toString());
    }

    getClose(): number {
        return this.closingTime;
    }

    getCloseString(): string {
        var time = this.getClose();
        // Rectify our weird 24+ data scheme
        if (time > 2400) time -= 2400;
        return insertColon(time.toString());
    }

    getInterval(): [number, number] {
        return [this.openingTime, this.closingTime];
    }

    getIntervalString(): string {
        return this.getOpenString() + " to " + this.getCloseString();
    }
}

class Place {
    private name: string;
    private isOnCampus: boolean;
    private Sunday: [Interval];
    private Monday: [Interval];
    private Tuesday: [Interval];
    private Wednesday: [Interval];
    private Thursday: [Interval];
    private Friday: [Interval];
    private Saturday: [Interval];

    constructor(name: string, isOnCampus: boolean, Sunday: [Interval], Monday: [Interval], Tuesday: [Interval], Wednesday: [Interval], Thursday: [Interval], Friday: [Interval], Saturday: [Interval]) {
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

    getName(): string {
        return this.name;
    }

    getHoursForDay(d : number) : [Interval] {
        switch (d) {
            case 0: return this.Sunday;
            case 1: return this.Monday;
            case 2: return this.Tuesday;
            case 3: return this.Wednesday;
            case 4: return this.Thursday;
            case 5: return this.Friday;
            case 6: return this.Saturday;
        }
    }

    getHoursForToday(): [Interval] {
        return this.getHoursForDay((new Date()).getDay());
    }

    isOpenNow(): boolean {
        var date = new Date();
        var hour: number = date.getHours();
        // I'm arbitrarily deciding that any times before 4:59am belong to the previous day.
        if (hour < 5) hour += 24;
        var minute: number = date.getMinutes();
        var time: number = (hour * 100) + minute;
        var openings: [Interval] = this.getHoursForToday();
        for (var i=0; i<openings.length; i++) {
            var x: Interval = openings[i];
            if ((time > x.getOpen()) && (time < x.getClose())) return true;
        }
        return false;
    }
}

function stringifyHours(hours: [Interval]): string {
    if (hours == Interval.none) return "closed today";
    var output: string = "";
    for (var i=0; i<hours.length; i++) {
        var x: Interval = hours[i];
        output += x.getIntervalString() + " and ";
    }
    return output.slice(0, -5);  //remove that annoying last "and"
}

function insertColon(time: string): string {
    return time.slice(0, -2) + ":" + time.slice(-2, time.length);
}


// name, isOnCampus, Sunday, Monday,<...>, Saturday
var places : [Place] = [
    new Place("Open Kitchen", true,
    /*Sunday*/      [new Interval(1000, 1400)],
    /*Monday*/      [new Interval(730, 1130), new Interval(1500, 1900)],
    /*Tuesday*/     [new Interval(730, 1130), new Interval(1500, 1900)],
    /*Wednesday*/   [new Interval(730, 1130), new Interval(1500, 1900)],
    /*Thursday*/    [new Interval(730, 1130), new Interval(1500, 1900)],
    /*Friday*/      [new Interval(730, 1130), new Interval(1500, 1900)],
    /*Saturday*/    [new Interval(1000, 1400)]
                ),
    new Place("House Dinner", true,
    /*Sunday*/      Interval.none,
    /*Monday*/      [new Interval(1730, 1900)],
    /*Tuesday*/     [new Interval(1730, 1900)],
    /*Wednesday*/   [new Interval(1730, 1900)],
    /*Thursday*/    [new Interval(1730, 1900)],
    /*Friday*/      [new Interval(1700, 1830)],
    /*Saturday*/    Interval.none
                ),
    new Place("Chandler Breakfast", true,
    /*Sunday*/      Interval.none,
    /*Monday*/      [new Interval(700, 1000)],
    /*Tuesday*/     [new Interval(700, 1000)],
    /*Wednesday*/   [new Interval(700, 1000)],
    /*Thursday*/    [new Interval(700, 1000)],
    /*Friday*/      [new Interval(700, 1000)],
    /*Saturday*/    Interval.none
                ),
    new Place("Chandler Sushi", true,
    /*Sunday*/      Interval.none,
    /*Monday*/      [new Interval(1100, 1330)],
    /*Tuesday*/     [new Interval(1100, 1330)],
    /*Wednesday*/   [new Interval(1100, 1330)],
    /*Thursday*/    [new Interval(1100, 1330)],
    /*Friday*/      [new Interval(1100, 1330)],
    /*Saturday*/    Interval.none
                ),
    new Place("Chandler Lunch", true,
    /*Sunday*/      Interval.none,
    /*Monday*/      [new Interval(1100, 1430)],
    /*Tuesday*/     [new Interval(1100, 1430)],
    /*Wednesday*/   [new Interval(1100, 1430)],
    /*Thursday*/    [new Interval(1100, 1430)],
    /*Friday*/      [new Interval(1100, 1430)],
    /*Saturday*/    Interval.none
                ),
    new Place("Chandler Pizza and Grill", true,
    /*Sunday*/      Interval.none,
    /*Monday*/      [new Interval(1100, 1530)],
    /*Tuesday*/     [new Interval(1100, 1530)],
    /*Wednesday*/   [new Interval(1100, 1530)],
    /*Thursday*/    [new Interval(1100, 1530)],
    /*Friday*/      [new Interval(1100, 1530)],
    /*Saturday*/    Interval.none
                ),
    new Place("Red Door", true,
    /*Sunday*/      Interval.none,
    /*Monday*/      [new Interval(730, 1730)],
    /*Tuesday*/     [new Interval(730, 1730)],
    /*Wednesday*/   [new Interval(730, 1730)],
    /*Thursday*/    [new Interval(730, 1730)],
    /*Friday*/      [new Interval(730, 1730)],
    /*Saturday*/    Interval.none
                ),
    new Place("Broad Cafe", true,
    /*Sunday*/      Interval.none,
    /*Monday*/      [new Interval(745, 1430)],
    /*Tuesday*/     [new Interval(745, 1430)],
    /*Wednesday*/   [new Interval(745, 1430)],
    /*Thursday*/    [new Interval(745, 1430)],
    /*Friday*/      [new Interval(745, 1430)],
    /*Saturday*/    Interval.none
                ),
    new Place("Chouse Grill", true,
    /*Sunday*/      [new Interval(2200, 2530)],
    /*Monday*/      [new Interval(2200, 2530)],
    /*Tuesday*/     [new Interval(2200, 2530)],
    /*Wednesday*/   [new Interval(2200, 2530)],
    /*Thursday*/    [new Interval(2200, 2530)],
    /*Friday*/      Interval.none,
    /*Saturday*/    Interval.none
                ),
    new Place("Chouse", true,
    /*Sunday*/      [new Interval(2200, 2600)],
    /*Monday*/      [new Interval(2200, 2600)],
    /*Tuesday*/     [new Interval(2200, 2600)],
    /*Wednesday*/   [new Interval(2200, 2600)],
    /*Thursday*/    [new Interval(2200, 2600)],
    /*Friday*/      Interval.none,
    /*Saturday*/    Interval.none
                ),
    new Place("C-Store", true,
    /*Sunday*/      [new Interval(1200, 2500)],
    /*Monday*/      [new Interval(1030, 2500)],
    /*Tuesday*/     [new Interval(1030, 2500)],
    /*Wednesday*/   [new Interval(1030, 2500)],
    /*Thursday*/    [new Interval(1030, 2500)],
    /*Friday*/      [new Interval(1030, 2500)],
    /*Saturday*/    [new Interval(1100, 2000)]
                ),
    new Place("Package Annex", true,
    /*Sunday*/      Interval.none,
    /*Monday*/      [new Interval(900, 1600), new Interval(2030, 2230)],
    /*Tuesday*/     [new Interval(900, 1600), new Interval(2030, 2230)],
    /*Wednesday*/   [new Interval(900, 1600), new Interval(2030, 2230)],
    /*Thursday*/    [new Interval(900, 1600), new Interval(2030, 2230)],
    /*Friday*/      [new Interval(900, 1600), new Interval(2030, 2230)],
    /*Saturday*/    Interval.none
                ),
]

function updateCurrentTime(): void {
    var currentTime = document.getElementById("currentTime");
    currentTime.innerText = "Current time is: " + (new Date()).toLocaleTimeString('en-US', {hour12: false});
}

function updateHighlighting(): void {
    var openPlaces = document.getElementById("openPlaces");
    var closedPlaces = document.getElementById("closedPlaces");
    openPlaces.innerHTML = "";
    closedPlaces.innerHTML = "";
    for (var i=0; i<places.length; i++) {
        var place: Place = places[i];

        var content: string = place.getName() + ": " + stringifyHours(place.getHoursForToday());

        var para = document.createElement("p");
        var text = document.createTextNode(content);
        para.appendChild(text);

        if (place.isOpenNow()) {
            addClass(para, "open");
            openPlaces.appendChild(para);
        } else {
            addClass(para, "closed");
            closedPlaces.appendChild(para);
        }
    }
}

window.onload = function() {
    // Populate the Current Time field
    updateCurrentTime();
    setInterval(updateCurrentTime, 5000);

    // Populate the list of places
    updateHighlighting();
    setInterval(updateHighlighting, 5000);

}
