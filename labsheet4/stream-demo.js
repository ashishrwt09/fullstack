const fs = require('fs');

const filename = 'large.txt';
const lines = Array.from({ length: 60 }, (_, i) => `Line ${i + 1}: Sample stream text data\n`).join('');

fs.writeFileSync(filename, lines);

const readStream = fs.createReadStream(filename, { highWaterMark: 128 });

readStream.on('data', (chunk) => {
  console.log(`Received chunk size: ${chunk.length} bytes`);
});

readStream.on('end', () => {
  console.log("Finished reading stream.");
});