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
        if (this.getOpen() == 0 && this.getClose() == 2400)
            return "All day";
        return this.getOpenString() + " to " + this.getCloseString();
    };
    return Interval;
}());
Interval.none = [new Interval(-1, -1)];
var Place = (function () {
    function Place(name, data) {
        var _this = this;
        this.name = name;
        this.isOnCampus = true;
        Object.keys(data).forEach(function (dayName) {
            if (data[dayName] === []) {
                _this[dayName] = Interval.none;
            }
            else {
                _this[dayName] = data[dayName].map(function (interval) {
                    return new Interval(interval[0], interval[1]);
                });
            }
        });
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
}());
