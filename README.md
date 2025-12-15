# Cron-Parser

## Get Started

1. Clone the repository
2. Run `npm install`
3. Run `npm build`
4. Run `chmod +x dist/index.js`
5. Run `npm install -g .` <br/> (`--force` for reinstallation)
6. Here you go 🎉, Run `cron-parser "5-10 4,8 1 */3 0"`
7. You can run tests by `npm test`

## Examples

Cron String: `*/15 0 1,15 * 1-5`
```bash
cron-parser git:(main) ✗ cron-parser "*/15 0 1,15 * 1-5"                
minute        0 15 30 45
hour          0
day of month  1 15
month         1 2 3 4 5 6 7 8 9 10 11 12
day of week   1 2 3 4 5
command       cron-parser
```

Incorrect Cron String: `65 * * 1-6 *`
```bash
cron-parser git:(main) ✗ cron-parser "65 * * 1-6 *"     
validation Error: Minute - Invalid time range for Minute
```

Incorrect Cron String: `1,10 * * 7-6 *`
```bash
cron-parser git:(main) ✗ cron-parser "1,10 * * 7-6 *"
validation Error: Month - Invalid range value
```
