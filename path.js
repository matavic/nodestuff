var path = require('path')
// Normalization
console.log('normalization : ' + path.normalize('/test/test1//2slashes/1slash/tab/..'))

// Join
console.log('joint path : ' + path.join('/test', 'test1', '2slashes/1slash', 'tab', '..'));

// Resolve
console.log('resolve : ' + path.resolve('path.js'));

// extName
console.log('ext name : ' + path.extname('path.js'));
