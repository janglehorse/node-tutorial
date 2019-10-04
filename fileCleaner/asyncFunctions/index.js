const path = require('path');
const fs = require('fs');

const ms1Day = 24*60*60*1000;
const LOGS_PATH = path.join(__dirname, '../logs');

const ONE_WEEK_AGO = new Date();
ONE_WEEK_AGO.setDate(ONE_WEEK_AGO.getDate() - 7); 

module.exports = {
    writeFileDecrementTimeStamp: function(i) {
        return new Promise((resolve, reject) => {
            const filename = path.join(LOGS_PATH, `log_${i}`);
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
    },
    cleanup: function() {
        const files = fs.readdirSync(LOGS_PATH);
        files.forEach(filename => {
            fs.stat(path.join(LOGS_PATH, filename), (err, stats) => {
                if (err) throw err;
                if (stats.birthtime < ONE_WEEK_AGO) {
                    console.log(`${filename} is too old. Deleting...`)
                    fs.unlink(path.join(LOGS_PATH, filename), err => {
                        if (err) {
                            console.log(`Couldn't delete ${path.join(LOGS_PATH, filename)}: ${err}`);
                            throw err;
                        }
                        console.log(`deleted ${filename}`)
                    });
                }
            });
        });
    }
}