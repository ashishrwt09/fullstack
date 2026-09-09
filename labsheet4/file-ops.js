const fs = require('fs');

fs.writeFile('student.txt', 'Name: Ashish Singh Rawat\nRoll No: 2024001\n', (err) => {
  if (err) throw err;
  console.log("student.txt created.");

  fs.appendFile('student.txt', 'Course: Full Stack Web Development\n', (err) => {
    if (err) throw err;
    console.log("Course appended.");

    fs.readFile('student.txt', 'utf8', (err, data) => {
      if (err) throw err;
      console.log("\n--- File Content ---\n" + data);

      fs.rename('student.txt', 'profile.txt', (err) => {
        if (err) throw err;
        console.log("File renamed to profile.txt");
      });
    });
  });
});