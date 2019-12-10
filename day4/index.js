/*
- It is a six-digit number.
- The value is within the range given in your puzzle input.
- Two adjacent digits are the same (like 22 in 122345).
- Going from left to right, the digits never decrease; they only ever increase or stay the same (like 111123 or 135679).

*/
let count = 0;
for (var i = 245318; i < 765747; ++i) {
    if (i % 5000 == 0) {
        //console.log(i)
    }
    if (!valid(i.toString())) {
        continue
    }
    console.log(i)
    count++
}
console.log("Result: ", count)

console.log("Result1: ", valid("112233"))
console.log("Result2: ", valid("123444"))
console.log("Result3: ", valid("111122"))


function valid(str) {
    let doubles = {}, c = str[0], ct = 1
    for (let i = 0; i < 5; ++i) {
        if (str[i] > str[i+1]) {
            return false
        }
    }
    return hasUniqueDouble(str)
}

function hasUniqueDouble(str) {
    let c = str[0], ct = 1
    for (let i = 0; i < 5; ++i) {
        if (str[i+1] == c) {
            ct++
        } else {
            if (ct == 2) {
                return true
            }
            c = str[i+1]
            ct = 1
        }
    }
    return ct == 2
}