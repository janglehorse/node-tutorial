const fs = require('fs');
const path = require('path');
const util = require('util');
const writeFileDecrementTimeStamp = require('./asyncFunctions');

const dirname = path.join(__dirname, 'logs');

/*
Writes files, alters their timestamps and then deletes those older than 7 days, asynchronously
*/
const ONE_WEEK_AGO = new Date();
ONE_WEEK_AGO.setDate(ONE_WEEK_AGO.getDate() - 7); 

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

async function main() {
    for (i = 0; i < 10; i++) {
        await writeFileDecrementTimeStamp()
            .catch(e => {console.log('ERROR: ', e)});
    }
    cleanup();
}

main();