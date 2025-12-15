export enum TimeType {
    Minute = "Minute",
    Hour = "Hour",
    Day = "Day",
    Month = "Month",
    Weekday = "Weekday"
}

export type ValidateResponse = {
    valid: boolean;
    msg?: string;
}
