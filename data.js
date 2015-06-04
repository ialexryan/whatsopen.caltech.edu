/// <reference path="classes.ts" />
var foodPlaces = [
    new Place("Open Kitchen", true, [new Interval(1000, 1400)], [new Interval(730, 1130), new Interval(1500, 1900)], [new Interval(730, 1130), new Interval(1500, 1900)], [new Interval(730, 1130), new Interval(1500, 1900)], [new Interval(730, 1130), new Interval(1500, 1900)], [new Interval(730, 1130), new Interval(1500, 1900)], [new Interval(1000, 1400)]),
    new Place("Chandler (Breakfast)", true, Interval.none, [new Interval(700, 1000)], [new Interval(700, 1000)], [new Interval(700, 1000)], [new Interval(700, 1000)], [new Interval(700, 1000)], Interval.none),
    new Place("Chandler (Sushi)", true, Interval.none, [new Interval(1100, 1330)], [new Interval(1100, 1330)], [new Interval(1100, 1330)], [new Interval(1100, 1330)], [new Interval(1100, 1330)], Interval.none),
    new Place("Chandler (Lunch)", true, Interval.none, [new Interval(1100, 1430)], [new Interval(1100, 1430)], [new Interval(1100, 1430)], [new Interval(1100, 1430)], [new Interval(1100, 1430)], Interval.none),
    new Place("Chandler (Pizza/Grill)", true, Interval.none, [new Interval(1100, 1530)], [new Interval(1100, 1530)], [new Interval(1100, 1530)], [new Interval(1100, 1530)], [new Interval(1100, 1530)], Interval.none),
    new Place("South House Kitchens", true, Interval.none, [new Interval(1130, 1300)], [new Interval(1130, 1300)], [new Interval(1130, 1300)], [new Interval(1130, 1300)], [new Interval(1130, 1300)], Interval.none),
    new Place("Red Door", true, Interval.none, [new Interval(730, 1730)], [new Interval(730, 1730)], [new Interval(730, 1730)], [new Interval(730, 1730)], [new Interval(730, 1730)], Interval.none),
    new Place("Broad Cafe", true, Interval.none, [new Interval(745, 1430)], [new Interval(745, 1430)], [new Interval(745, 1430)], [new Interval(745, 1430)], [new Interval(745, 1430)], Interval.none),
    new Place("House Dinner", true, Interval.none, [new Interval(1730, 1900)], [new Interval(1730, 1900)], [new Interval(1730, 1900)], [new Interval(1730, 1900)], [new Interval(1700, 1830)], Interval.none),
    new Place("Chouse (Grill)", true, [new Interval(2200, 2530)], [new Interval(2200, 2530)], [new Interval(2200, 2530)], [new Interval(2200, 2530)], [new Interval(2200, 2530)], Interval.none, Interval.none),
    new Place("Chouse", true, [new Interval(2200, 2600)], [new Interval(2200, 2600)], [new Interval(2200, 2600)], [new Interval(2200, 2600)], [new Interval(2200, 2600)], Interval.none, Interval.none),
    new Place("C-Store", true, [new Interval(1200, 2500)], [new Interval(1030, 2500)], [new Interval(1030, 2500)], [new Interval(1030, 2500)], [new Interval(1030, 2500)], [new Interval(1030, 2500)], [new Interval(1100, 2000)]),
];
var libraryPlaces = [
    new Place("SFL", true, [new Interval(900, 2400)], [new Interval(0, 2400)], [new Interval(0, 2400)], [new Interval(0, 2400)], [new Interval(0, 2400)], [new Interval(0, 2700)], [new Interval(900, 2600)]),
    new Place("Millikan", true, [new Interval(900, 2400)], [new Interval(800, 2400)], [new Interval(800, 2400)], [new Interval(800, 2400)], [new Interval(800, 2400)], [new Interval(800, 2400)], [new Interval(900, 2400)]),
    new Place("Dabney", true, Interval.none, [new Interval(800, 1700)], [new Interval(800, 1700)], [new Interval(800, 1700)], [new Interval(800, 1700)], [new Interval(800, 1700)], Interval.none),
    new Place("Cahill", true, Interval.none, [new Interval(800, 1700)], [new Interval(800, 1700)], [new Interval(800, 1700)], [new Interval(800, 1700)], [new Interval(800, 1700)], Interval.none),
    new Place("Geology", true, Interval.none, [new Interval(800, 1700)], [new Interval(800, 1700)], [new Interval(800, 1700)], [new Interval(800, 1700)], [new Interval(800, 1700)], Interval.none),
    new Place("Archives", true, Interval.none, [new Interval(800, 1700)], [new Interval(800, 1700)], [new Interval(800, 1700)], [new Interval(800, 1700)], [new Interval(800, 1700)], Interval.none),
];
var miscPlaces = [
    new Place("Package Annex", true, Interval.none, [new Interval(900, 1100), new Interval(1200, 1600), new Interval(2030, 2230)], [new Interval(900, 1100), new Interval(1200, 1600), new Interval(2030, 2230)], [new Interval(900, 1100), new Interval(1200, 1600), new Interval(2030, 2230)], [new Interval(900, 1100), new Interval(1200, 1600), new Interval(2030, 2230)], [new Interval(900, 1100), new Interval(1200, 1600), new Interval(2030, 2230)], Interval.none),
    new Place("Gym", true, [new Interval(800, 2000)], [new Interval(600, 2230)], [new Interval(600, 2230)], [new Interval(600, 2230)], [new Interval(600, 2230)], [new Interval(600, 2230)], [new Interval(800, 2000)]),
    new Place("Bookstore", true, Interval.none, [new Interval(830, 1730)], [new Interval(830, 1730)], [new Interval(830, 1730)], [new Interval(830, 1730)], [new Interval(830, 1730)], Interval.none),
];
