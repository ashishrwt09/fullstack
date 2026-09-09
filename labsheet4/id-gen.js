const { nanoid } = require('nanoid');

console.log("Generated 5 IDs:");
for (let i = 0; i < 5; i++) {
  console.log(`${i + 1}:`, nanoid());
}