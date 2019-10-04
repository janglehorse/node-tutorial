const fs = require('fs');
const path = require('path');
const util = require('util');
const dirname = path.join(__dirname, 'logs');

/*
Writes files, alters their timestamps and then deletes those older than 7 days, asynchronously, but with promises
*/

const ONE_WEEK_AGO = new Date();
ONE_WEEK_AGO.setDate(ONE_WEEK_AGO.getDate() - 7);
const ms1Day = 24*60*60*1000;

// write some random files in the /log directory 
function writeSomeRandomFilesAndDoStuff(i) {
    return new Promise((resolve, reject) => {
        const filename = path.join(dirname, `log_${i}`);
        data = `This is log ${i}`;
        fs.writeFile(filename, data, (err) => {
            if (err) {
                reject(err);
            }
            const time = (Date.now() - i*ms1Day)/1000;
            fs.utimes(filename, time, time, (err) => {
                if (err) {
                    reject(err);
                }
                console.log(`wrote '${filename}' successfully`)
                resolve();
            });
        });
    });
}

function cleanup() {
    const files = fs.readdirSync(dirname);
    files.forEach(filename => {
        fs.stat(path.join(dirname, filename), (err, stats) => {
            if (err) throw err;
            if (stats.birthtime < ONE_WEEK_AGO) {
                console.log(`${filename} is too old. Deleting...`)
                fs.unlink(path.join(dirname, filename), err => {
                    if (err) {
                        console.log(`Couldn't delete ${path.join(dirname, filename)}: ${err}`);
                        throw err;
                    }
                    console.log(`deleted ${filename}`)
                });
            }
        });
    });
}

function main() {
    const promiseArray = []
    for (i = 0; i < 10; i++) {
        promiseArray.push(writeSomeRandomFilesAndDoStuff(i));
    }
    Promise.all(promiseArray).then(() => {
        cleanup();
    });
}

main();