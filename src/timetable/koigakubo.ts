interface Timetable {
    getTimetable: number[][]
}

export default class KoigakuboTimetable implements Timetable {
    private nowDate: Date

    constructor(private timetable?: number[][]) {
        if (typeof timetable === 'undefined') {
            this.timetable = weekday
        }
        this.nowDate = new Date(Date.now() - (-9 * 60 - new Date().getTimezoneOffset()) * 60000)
    }

    get getTimetable () {
        return this.timetable;
    }

    // TODO: getWeekend も実装する
}

export const weekday = [
    /*  0時 */ [12],
    /*  1時 */ [],
    /*  2時 */ [],
    /*  3時 */ [],
    /*  4時 */ [],
    /*  5時 */ [13, 33, 49],
    /*  6時 */ [4, 20, 31, 42, 53],
    /*  7時 */ [1, 9, 16, 24, 32, 40, 46, 54],
    /*  8時 */ [2, 9, 16, 24, 31, 39, 47, 56],
    /*  9時 */ [4, 16, 26, 36, 46, 56],
    /* 10時 */ [5, 15, 25, 35, 46, 55],
    /* 11時 */ [5, 15, 25, 35, 46, 55],
    /* 12時 */ [5, 15, 25, 35, 46, 55],
    /* 13時 */ [5, 15, 25, 35, 46, 55],
    /* 14時 */ [5, 15, 25, 35, 46, 55],
    /* 15時 */ [5, 15, 25, 35, 46, 55],
    /* 16時 */ [5, 16, 26, 36, 46, 56],
    /* 17時 */ [6, 17, 27, 39, 49],
    /* 18時 */ [0, 10, 20, 30, 40, 50],
    /* 19時 */ [0, 10, 20, 30, 40, 50],
    /* 20時 */ [0, 10, 20, 30, 40, 50],
    /* 21時 */ [0, 12, 22, 33, 45, 54],
    /* 22時 */ [8, 22, 37, 52],
    /* 23時 */ [9, 23, 37, 57]  
];