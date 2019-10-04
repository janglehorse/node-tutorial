const fs = require('fs');
const path = require('path');
const dirname = path.join(__dirname, '../logs');

const ONE_WEEK_AGO = new Date();
ONE_WEEK_AGO.setDate(ONE_WEEK_AGO.getDate() - 7);
const ms1Day = 24*60*60*1000;

module.exports = {
    /**
     * uses Node's blocking methods to write and alter files
     */
    writeFileDecrementTimeStamp: function(i) {
        const filename = path.join(dirname, `log_${i}`);
        data = `This is log ${i}`;
        fs.writeFileSync(filename, data);
        console.log('successfully wrote ', filename);
        const time = (Date.now() - i*ms1Day)/1000;
        fs.utimesSync(filename, time, time);
    },
    /**
     * uses blocking method to delete files older than 7 days
     */
    cleanup: function() {
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
}