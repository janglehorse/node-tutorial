const asyncHelpers = require('./asyncFunctions');
/**
 * asynchronous implementation using Promise.all()
 */ 
function main() {
    const promiseArray = []
    for (i = 0; i < 10; i++) {
        promiseArray.push(asyncHelpers.writeFileDecrementTimeStamp(i));
    }
    Promise.all(promiseArray).then(() => {
        asyncHelpers.cleanup();
    });
}

main();