const path = require('path');
const fs = require('fs');

const ms1Day = 24*60*60*1000;
const LOGS_PATH = path.join(__dirname, '../logs');

module.exports = function() {
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
}