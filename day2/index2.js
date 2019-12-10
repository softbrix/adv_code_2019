const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var registers;
var readRegisters;
var endResult;
rl.on('line', (input) => {
  if (input.indexOf(",") >= 0) {
    readRegisters = input.split(",").map(x => parseInt(x, 10))
  } else {
      endResult = parseInt(input, 10)
  }
});

rl.on('close', (input) => {
  for (let i = 0; i < 99; ++i) {
      for (let j = 0; j < 99; ++j) {
        registers = readRegisters.slice(0);
        registers[1] = i
        registers[2] = j
        compute(0)
        if (registers[0] === endResult) {
            result = 100 * i + j
            console.log(`Answer: ${result}`);
            process.exit(0)
        }
      }
  }
  console.log("No result found")
});

function compute(idx) {
    let op = registers[idx]
    let r1 = registers[idx + 1]
    let r2 = registers[idx + 2]
    let pos = registers[idx + 3]
    switch(op) {
        case 1: registers[pos] = registers[r1] + registers[r2]; break;
        case 2: registers[pos] = registers[r1] * registers[r2]; break;
        case 99: return
        default:
            console.log("Sig fault: ", op, idx)
            console.log(JSON.stringify(registers))
            return
    }
    compute(idx + 4)

}