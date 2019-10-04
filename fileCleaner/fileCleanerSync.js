const blockingHelpers = require('./blockingFunctions');

function main() {
    for (i = 0; i < 10; i++) {
        blockingHelpers.writeFileDecrementTimeStamp(i);
    }
    blockingHelpers.cleanup();
}

main();