import { TimeType, ValidateResponse } from './types/index'

const timeRangeCheck = (time: string, min: number, max: number) => {
    if (Number(time) < min || Number(time) > max) {
        return false
    }
    return true
}

const checkStar = (time: string) => {
    if (time == "*") {
        return true
    }
    return false
}

const checkNumber = (time: string) => {
    if (!isNaN(Number(time))) {
        return true
    }
    return false
}

const checkStepValue = (time: string) => {
    if (time.includes('/')){
        return true
    }
    return false
}

const checkSeparator = (time: string) => {
    if (time.includes(',')){
        return true
    }
    return false
}

const checkRange = (time: string) => {
    if (time.includes('-')) {
        return true
    }
    return false;
}

const getPossibleRangeValues = (min: number, max:number, increment = 1): number[] => {
    const arr = []
    for(let i = min; i<=max; i+=increment) {
        arr.push(i)
    }
    return arr;
}

const timeRangeMap = {
    [TimeType.Minute]: [0, 59],
    [TimeType.Hour]: [0, 23],
    [TimeType.Day]: [1, 31],
    [TimeType.Month]: [1, 12],
    [TimeType.Weekday]: [0, 6],
}

class CronTime {
    type: TimeType
    time: string
    minRange: number
    maxRange: number
    private _timeValue: number[] = []
    constructor(type: TimeType, time: string) {
        this.type = type
        this.time = time
        this.minRange = timeRangeMap[this.type][0]
        this.maxRange = timeRangeMap[this.type][1]
    }

    get timeValue() {
        return this._timeValue;
    }

    getTimeValues(): string {
        return `${this.type} value is ${this.time}`
    }

    validate(): ValidateResponse {
        if (!this.time) {
            console.log(`${this.type} string missing`)
            return {
                valid: false,
                msg: `${this.type} string missing`
            }
        }
        if (checkStar(this.time)) {
            this._timeValue = getPossibleRangeValues(this.minRange, this.maxRange)
            return {
                valid: true
            }
        }
        if (checkNumber(this.time)) {
            if (timeRangeCheck(this.time, this.minRange, this.maxRange)) {
                this._timeValue = [Number(this.time)]
            } else {
                return {
                    valid: false,
                    msg: `Invalid time range for ${this.type}`
                }
            }
        }
        if (checkStepValue(this.time)) {
            const splits = this.time.split('/')
            if (!splits.length || splits.length !== 2) {
                return {
                    valid: false,
                    msg: 'Invalid step interval'
                }
            }
            if ((splits[0] !== '*' && splits[0] !== '0') || !checkNumber(splits[1]) || !timeRangeCheck(this.time, this.minRange, this.maxRange)) {
                return {
                    valid: false,
                    msg: 'Invalid step interval time'
                }
            }
            this._timeValue = getPossibleRangeValues(this.minRange, this.maxRange, Number(splits[1]))
        }
        if (checkSeparator(this.time)) {
            const splits = this.time.split(',')
            for (const element of splits) {
                if (!checkNumber(element) || !timeRangeCheck(element, this.minRange, this.maxRange)) {
                    return {
                        valid: false,
                        msg: 'Invalid specific values provided'
                    }
                }
            }
            this._timeValue = splits.map(i => Number(i))
        }
        if (checkRange(this.time)) {
            const splits = this.time.split('-')
             if (!splits.length || splits.length !== 2) {
                return {
                    valid: false,
                    msg: 'Incorrect range value'
                }
            }
            if (!checkNumber(splits[0]) || !checkNumber(splits[1]) || !timeRangeCheck(splits[0], this.minRange, this.maxRange) || !timeRangeCheck(splits[1], this.minRange, this.maxRange) || splits[0] > splits[1]) {
                return {
                    valid: false,
                    msg: 'Invalid range value'
                }
            }
            this._timeValue = getPossibleRangeValues(Number(splits[0]), Number(splits[1]))
        }
        return {
            valid: true
        }
    }
}

export { CronTime }