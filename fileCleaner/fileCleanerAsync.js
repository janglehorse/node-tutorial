const fs = require('fs');
const path = require('path');
const util = require('util');
const asyncHelpers = require('./asyncFunctions');

async function main() {
    for (i = 0; i < 10; i++) {
        await asyncHelpers.writeFileDecrementTimeStamp(i)
            .catch(e => {console.log('ERROR: ', e)});
    }
    asyncHelpers.cleanup();
}

main();