import { CronTime } from './time'
import { TimeType, ValidateResponse } from './types';

class Cron {
    private readonly cronString: string;
    private minuteString: string = "";
    private hourString: string = "";
    private dayString: string = "";
    private monthString: string = "";
    private weekdayString: string = "";

    private minuteValues: number[] = []
    private hourValues: number[] = []
    private dayValues: number[] = []
    private monthValues: number[] = []
    private weekdayValues: number[] = []

    constructor(cronString: string) {
        this.cronString = cronString.trim()
    }

    public getCronString(): string {
        return this.cronString;
    }

    public validateCronString(): ValidateResponse {
        const cronSplits: string[] = this.cronString.split(' ');
        if (cronSplits.length != 5) {
            console.log("Invalid cron string provided")
            return {valid: false, msg: "Invalid cron string provided"};
        }
        this.minuteString = cronSplits?.[0] || "";
        this.hourString = cronSplits?.[1] || "";
        this.dayString = cronSplits?.[2] || "";
        this.monthString = cronSplits?.[3] || "";
        this.weekdayString = cronSplits?.[4] || "";

        const min = new CronTime(TimeType.Minute, this.minuteString)
        const hr = new CronTime(TimeType.Hour, this.hourString)
        const day = new CronTime(TimeType.Day, this.dayString)
        const month = new CronTime(TimeType.Month, this.monthString)
        const weekday = new CronTime(TimeType.Weekday, this.weekdayString)

        const cronTimeArr = [min, hr, day, month, weekday]
        for (const time of cronTimeArr) {
            const isValid = time.validate()
            if (!isValid.valid) {
                const errString = `${time.type} - ${isValid.msg || 'Some error'}`
                return {valid: false, msg: errString};
            }
            switch (time.type) {
                case TimeType.Minute:
                    this.minuteValues = time.timeValue
                    break;
                case TimeType.Hour:
                    this.hourValues = time.timeValue
                    break;
                case TimeType.Day:
                    this.dayValues = time.timeValue
                    break;
                case TimeType.Month:
                    this.monthValues = time.timeValue
                    break;
                case TimeType.Weekday:
                    this.weekdayValues = time.timeValue
                    break;
            
                default:
                    return {valid: false, msg: "Invalid Time Type"};
            }
        };

        return {valid: true}
    }

    printCronTimings() {
        const columnWidth = 14
        console.log('minute'.padEnd(columnWidth) + `${this.minuteValues.join(' ')}`)
        console.log('hour'.padEnd(columnWidth) + `${this.hourValues.join(' ')}`)
        console.log('day of month'.padEnd(columnWidth) + `${this.dayValues.join(' ')}`)
        console.log('month'.padEnd(columnWidth) + `${this.monthValues.join(' ')}`)
        console.log('day of week'.padEnd(columnWidth) + `${this.weekdayValues.join(' ')}`)
        console.log('command'.padEnd(columnWidth) + 'cron-parser')
    }

    getMinuteValues(){
        return this.minuteValues
    }
    getHourValues(){
        return this.hourValues
    }
    getDayValues(){
        return this.dayValues
    }
    getMonthValues(){
        return this.monthValues
    }
    getWeekdayValues(){
        return this.weekdayValues
    }
}

export default Cron;
