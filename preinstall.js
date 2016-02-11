'use strict';

console.log(process.cwd());

try {
    require('fear-core');
    console.log('fear core not available');
} catch (err) {
    console.log('fear core not available');
}