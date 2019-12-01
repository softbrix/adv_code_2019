const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let sum = 0
rl.on('line', (input) => {
  // sum += Math.floor(input / 3) - 2
  sum += calculator(input)
});

rl.on('close', (input) => {
  console.log(`Sum: ${sum}`);
});

function calculator(input) {
    let fuel = Math.floor(input / 3) - 2
    fuel = Math.max(fuel, 0)
    if (fuel >= 9) {
        fuel += calculator(fuel)
    } 
    return fuel;
}