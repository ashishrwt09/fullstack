const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'uploads');

fs.mkdir(dir, { recursive: true }, (err) => {
  if (err) throw err;

  ['file1.txt', 'file2.txt', 'file3.txt'].forEach(f => fs.writeFileSync(path.join(dir, f), ''));
  console.log("Files created inside uploads.");

  fs.readdir(dir, (err, files) => {
    if (err) throw err;
    console.log("Files in uploads:", files);

    fs.unlink(path.join(dir, 'file2.txt'), (err) => {
      if (err) throw err;
      console.log("file2.txt deleted.");
    });
  });
});