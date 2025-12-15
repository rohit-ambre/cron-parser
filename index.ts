#!/usr/bin/env node

import Cron from './src/cron'
const args = process.argv.slice(2);

const init = (args: string[]) => {
    if (!args.length) {
        console.log("Please provide cron string")
        return "Please provide cron string"
    }
    if (args.length > 1) {
        console.log("Invalid string provided")
        return "Invalid string provided"
    }
    const str: string = args[0] as string;
    const cron = new Cron(str);
    const isValid = cron.validateCronString()
    if (!isValid.valid) {
        console.log("validation Error:", isValid.msg)
        return isValid.msg
    }
    cron.printCronTimings()
}

init(args)
