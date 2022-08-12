var foodPlaces = [];
var libraryPlaces = [];
var miscPlaces = [];
function fetchDatabase(callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function (ev) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var hoursData_1 = JSON.parse(xhr.responseText);
            Object.keys(hoursData_1.foodPlaces).forEach(function (place) {
                var placeData = hoursData_1.foodPlaces[place];
                foodPlaces.push(new Place(place, placeData));
            });
            Object.keys(hoursData_1.libraryPlaces).forEach(function (place) {
                var placeData = hoursData_1.libraryPlaces[place];
                libraryPlaces.push(new Place(place, placeData));
            });
            Object.keys(hoursData_1.miscPlaces).forEach(function (place) {
                var placeData = hoursData_1.miscPlaces[place];
                miscPlaces.push(new Place(place, placeData));
            });
            callback();
        }
    };
    xhr.open("GET", "https://rawgit.com/wiki/ialexryan/whatsopen.caltech.edu/Hours-Database.md?nocache=" + new Date().getTime(), true);
    xhr.send();
}
