const args = process.argv.slice(2);

if (args.length < 3) {
  console.log("Usage: node calc-cli.js <num1> <num2> <operator>");
  process.exit(1);
}

const num1 = parseFloat(args[0]);
const num2 = parseFloat(args[1]);
const op = args[2];

let result;
switch (op) {
  case '+': result = num1 + num2; break;
  case '-': result = num1 - num2; break;
  case '*': result = num1 * num2; break;
  case '/': result = num2 !== 0 ? num1 / num2 : 'Error: Division by zero'; break;
  default: result = 'Invalid operator';
}

console.log(`Result: ${result}`);