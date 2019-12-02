const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var registers;
rl.on('line', (input) => {
  if (input.indexOf(",") >= 0) {
    registers = input.split(",").map(x => parseInt(x, 10))
  }
});

rl.on('close', (input) => {
    // replace position 1 with the value 12 and replace position 2 with the value 2
    registers[1] = 12
    registers[2] = 2
  compute(0)
  console.log("")
  console.log(`Answer: ${registers[0]}`);
  console.log(JSON.stringify(registers))
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