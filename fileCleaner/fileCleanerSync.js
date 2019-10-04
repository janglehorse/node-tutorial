const fs = require('fs');
const path = require('path');
const util = require('util');
const dirname = path.join(__dirname, 'logs');

const ONE_WEEK_AGO = new Date();
ONE_WEEK_AGO.setDate(ONE_WEEK_AGO.getDate() - 7);
const ms1Day = 24*60*60*1000;

// TODO: BONUS - write synchronous version

function writeRandomFileAndDecrementTimestamp(i) {
    const filename = path.join(dirname, `log_${i}`);
    data = `This is log ${i}`;
    fs.writeFileSync(filename, data);
    console.log('successfully wrote ', filename);
    const time = (Date.now() - i*ms1Day)/1000;
    fs.utimesSync(filename, time, time);
}

function cleanup() {
    const files = fs.readdirSync(dirname);
    files.forEach(filename => {
        const stats = fs.statSync(path.join(dirname, filename));
        if (stats.birthtime < ONE_WEEK_AGO) {
            console.log(`${filename} is too old. Deleting...`)
            try {
                fs.unlinkSync(path.join(dirname, filename));
                console.log(`deleted ${filename}`)
            }
            catch (e) {
                console.log(`Couldn't delete ${path.join(dirname, filename)}: ${err}`);
            }
        }
    });
}

function main() {
    for (i = 0; i < 10; i++) {
        writeRandomFileAndDecrementTimestamp(i);
    }
    cleanup();
}

main();