import Cron from '../src/cron';

describe('Class Cron Tests', () => {
    
    test('Invalid cron string', () => {
        const cron = new Cron("* * *");
        const isValid = cron.validateCronString()

        expect(isValid.valid).toBe(false)
        expect(isValid.msg).toBe('Invalid cron string provided')
    })

    test('Get cron string', () => {
        const cron = new Cron("* * * * *");
        const str = cron.getCronString()

        expect(str).toBe("* * * * *")
    })

    test('Get cron Minute value', () => {
        const cron = new Cron("5-10 * * * *");
        const isValid = cron.validateCronString()
        const val = cron.getMinuteValues()

        expect(val).toStrictEqual([5,6,7,8,9,10])
    })

    test('Get cron Invalid weekday', () => {
        const cron = new Cron("5-10 * * * 8");
        const isValid = cron.validateCronString()
        
        expect(isValid.valid).toBe(false)
        expect(isValid.msg).toBe('Weekday - Invalid time range for Weekday')
    })

    test('Get cron every cron values', () => {
        const cron = new Cron("5-10 4,8 1 */3 0");
        cron.validateCronString()
        const minVal = cron.getMinuteValues()
        const hrVal = cron.getHourValues()
        const dayVal = cron.getDayValues()
        const monthVal = cron.getMonthValues()
        const weekVal = cron.getWeekdayValues()

        // cron.printCronTimings()
        expect(minVal).toStrictEqual([5,6,7,8,9,10])
        expect(hrVal).toStrictEqual([4,8])
        expect(dayVal).toStrictEqual([1])
        expect(monthVal).toStrictEqual([1,4,7,10])
        expect(weekVal).toStrictEqual([0])
    })
})

