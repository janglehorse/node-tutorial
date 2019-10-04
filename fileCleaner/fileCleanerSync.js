const blockingHelpers = require('./blockingFunctions');
/**
 * synchronous implementation
 */
function main() {
    for (i = 0; i < 10; i++) {
        blockingHelpers.writeFileDecrementTimeStamp(i);
    }
    blockingHelpers.cleanup();
}

main();