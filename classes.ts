class Interval {

    // This is what we use when a place isn't open at all on a particular day
    static none: [Interval] = [new Interval(-1, -1)];

    private openingTime: number;
    private closingTime: number;

    constructor(open: number, close: number) {
        this.openingTime = open;
        this.closingTime = close;
    }

    // 1100
    getOpen(): number {
        return this.openingTime;
    }

    // "11:00am"
    getOpenString(): string {
        return stringifyHour(this.openingTime);
    }

    // 2530
    getClose(): number {
        return this.closingTime;
    }

    // "1:30am"
    getCloseString(): string {
        return stringifyHour(this.closingTime);
    }

    // [1100, 2530]
    getInterval(): [number, number] {
        return [this.openingTime, this.closingTime];
    }

    // "11:00am to 1:30am"
    getIntervalString(): string {
        if (this.getOpen() == 0 && this.getClose() == 2400) return "All day";
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

    getHoursForDay(d: number): [Interval] {
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

    getHoursForYesterday(): [Interval] {
        return this.getHoursForDay(((new Date()).getDay() - 1 + 7) % 7);
    }

    getHoursForToday(): [Interval] {
        return this.getHoursForDay((new Date()).getDay());
    }

    getHoursForTomorrow(): [Interval] {
        return this.getHoursForDay(((new Date()).getDay() + 1) % 7);
    }

    /* This function returns true if the Place is open right now, and
       false otherwise. */
    isOpenNow(): boolean {
        var time: number = getExtendedTime();

        // If we're dealing with 2500 (for example) we need to be looking at
        // yesterday's open intervals, not today's.
        if (time > 2400) {
            var openings: [Interval] = this.getHoursForYesterday();
        } else {
            var openings: [Interval] = this.getHoursForToday();
        }

        for (var i=0; i<openings.length; i++) {
            var x: Interval = openings[i];
            if ((time > x.getOpen()) && (time < x.getClose())) return true;
        }
        return false;
    }
}
