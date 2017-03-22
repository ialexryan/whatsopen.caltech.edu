// Copyright 2017 Alex Ryan
// (P.S. please don't judge how awful this JavaScript looks, it was compiled
// from much prettier TypeScript. TS is awesome!)

/// <reference path="classes.ts" />

var foodPlaces: Place[] = [];
var libraryPlaces: Place[] = [];
var miscPlaces: Place[] = [];

// This function downloads the contents of the Hours Database repo wiki page,
// parses the JSON into native data structures, and then calls the given callback
function fetchDatabase(callback: () => void): void {

    let xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.onreadystatechange = (ev: ProgressEvent) => {
        if (xhr.readyState == 4 && xhr.status == 200) {

            let hoursData = JSON.parse(xhr.responseText);

            Object.keys(hoursData.foodPlaces).forEach(place => {
                let placeData: PlaceWeekIntervalsJSON = hoursData.foodPlaces[place];
                foodPlaces.push(new Place(place, placeData))
            });
            Object.keys(hoursData.libraryPlaces).forEach(place => {
                let placeData: PlaceWeekIntervalsJSON = hoursData.libraryPlaces[place];
                libraryPlaces.push(new Place(place, placeData))
            });
            Object.keys(hoursData.miscPlaces).forEach(place => {
                let placeData: PlaceWeekIntervalsJSON = hoursData.miscPlaces[place];
                miscPlaces.push(new Place(place, placeData))
            });

            callback();
        }
    }
    xhr.open("GET", "https://rawgit.com/wiki/ialexryan/whatsopen.caltech.edu/Hours-Database.md", true);
    xhr.send();
}
