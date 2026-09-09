const path = require('path');

const samplePath = '/home/user/data/report.pdf';

console.log("Directory Name:", path.dirname(samplePath));
console.log("Base Name:     ", path.basename(samplePath));
console.log("Extension:     ", path.extname(samplePath));
console.log("Resolved Path: ", path.resolve('relative/file.txt'));