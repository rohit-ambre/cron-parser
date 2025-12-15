import {CronTime} from '../src/time';
import {TimeType} from '../src/types'

describe('Class CronTime Minute Tests', () => {
    test("Test Minute CronTime", () => {
        const ct = new CronTime(TimeType.Minute, "*/10");
        const str = ct.getTimeString()
        ct.validate()
        const val = ct.timeValue;

        expect(str).toBe('*/10')
        expect(val).toStrictEqual([0,10,20,30,40,50])
    })

    test("Test CronTime Minute Error", () => {
        const ct = new CronTime(TimeType.Minute, "65");
        const str = ct.getTimeString()
        const isValid = ct.validate();

        expect(isValid.valid).toBe(false)
        expect(isValid.msg).toBe('Invalid time range for Minute')
    })

    test("Test Minute *", () => {
        const ct = new CronTime(TimeType.Minute, "*");
        const str = ct.getTimeString()
        ct.validate();
        const val = ct.timeValue

        expect(val).toStrictEqual([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59])
    })

    test("Test Minute specifics", () => {
        const ct = new CronTime(TimeType.Minute, "5,10,15");
        ct.validate();
        const val = ct.timeValue

        expect(val).toStrictEqual([5,10,15])
    })

    test("Test Minute range", () => {
        const ct = new CronTime(TimeType.Minute, "30-40");
        ct.validate();
        const val = ct.timeValue

        expect(val).toStrictEqual([30,31,32,33,34,35,36,37,38,39,40])
    })

    test("Test Minute range", () => {
        const ct = new CronTime(TimeType.Minute, "37");
        ct.validate();
        const str = ct.getTimeValues()
        const val = ct.timeValue

        expect(str).toBe('Minute value is 37')
    })
});

describe('Class CronTime Hour Tests', () => {
    test("Test Hour range", () => {
        const ct = new CronTime(TimeType.Hour, "*");
        ct.validate();
        const val = ct.timeValue

        expect(val).toStrictEqual([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23])
    })

     test("Test Hour Incorrect step value", () => {
        const ct = new CronTime(TimeType.Hour, "*/a");
        const isValid = ct.validate();
        expect(isValid.valid).toBe(false)
        expect(isValid.msg).toBe('Invalid step interval time')
    })
})

describe('Class CronTime Day Tests', () => {
    test("Test Day range", () => {
        const ct = new CronTime(TimeType.Day, "*");
        ct.validate();
        const val = ct.timeValue

        expect(val).toStrictEqual([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31])
    })

    test("Test Day Incorrect step value", () => {
        const ct = new CronTime(TimeType.Day, "*/");
        const isValid = ct.validate();
        expect(isValid.valid).toBe(false)
        expect(isValid.msg).toBe('Invalid step interval')
    })

    test("Test Day Incorrect range value", () => {
        const ct = new CronTime(TimeType.Day, "5-");
        const isValid = ct.validate();
        expect(isValid.valid).toBe(false)
        expect(isValid.msg).toBe('Incorrect range value')
    })
})

describe('Class CronTime Month Tests', () => {
    test("Test Month range", () => {
        const ct = new CronTime(TimeType.Month, "*");
        ct.validate();
        const val = ct.timeValue

        expect(val).toStrictEqual([1,2,3,4,5,6,7,8,9,10,11,12])
    })

    test("Test Month Missing time", () => {
        const ct = new CronTime(TimeType.Month, "");
        const isValid = ct.validate();
        expect(isValid.valid).toBe(false)
        expect(isValid.msg).toBe('Month string missing')
    })

    test("Test Month Incomplete range", () => {
        const ct = new CronTime(TimeType.Month, "3,7,13");
        const isValid = ct.validate();
        expect(isValid.valid).toBe(false)
        expect(isValid.msg).toBe('Invalid specific values provided')
    })

})

describe('Class CronTime Weekday Tests', () => {
    test("Test Weekday range", () => {
        const ct = new CronTime(TimeType.Weekday, "*");
        ct.validate();
        const val = ct.timeValue

        expect(val).toStrictEqual([0,1,2,3,4,5,6])
    })

    test("Test Weekday invalid range", () => {
        const ct = new CronTime(TimeType.Weekday, "7-3");
        const isValid = ct.validate();
        const val = ct.timeValue

        expect(isValid.valid).toBe(false)
        expect(isValid.msg).toBe('Invalid range value')
    })

    test("Test Weekday invalid step", () => {
        const ct = new CronTime(TimeType.Weekday, "*/");
        const isValid = ct.validate();

        expect(isValid.valid).toBe(false)
        expect(isValid.msg).toBe('Invalid step interval')
    })

})

