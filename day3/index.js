const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var steps = [[],[]]
var lines = [];
rl.on('line', (input) => {
  if (input.indexOf(",") >= 0) {
    lines.push(input.split(",").map(x => {
        return {op: x[0], d: parseInt(x.substr(1), 10)}}))
  }
});

rl.on('close', () => {
  viewport(lines)
  walkPath(lines[0], steps[0])
  walkPath(lines[1], steps[1])
  let dist = compute()
  console.log("")
  console.log(`Answer: ${dist}`);
});

function viewport(lines) {
    let edges = {minX: 0, maxX: 0, minY: 0, maxY: 0}
    let c = {x: 0, y: 0}
    let updateEdges = () => {
        edges.minX = Math.min(edges.minX, c.x)
        edges.maxX = Math.max(edges.maxX, c.x)
        edges.minY = Math.min(edges.minY, c.y)
        edges.maxY = Math.max(edges.maxY, c.y)
    }
    let dist = 0;
    lines.forEach(line => {
        line.forEach(p => {
            switch(p.op) {
                case 'L': c.x -= p.d; break
                case 'R': c.x += p.d; break
                case 'U': c.y -= p.d; break
                case 'D': c.y += p.d; break
                default: console.error("Unknown op: ", p.op); process.exit(-1)
            }
            dist += p.d
            updateEdges();
        })
    })
    console.log(c, edges, dist)
}

function walkPath(line, st) {
    let pos = {x: 0, y: 0}; //Object.assign({}, center)
    line.forEach(p => {
        switch(p.op) {
            case 'L': left(pos, p.d, st); break
            case 'R': right(pos, p.d, st); break
            case 'U': up(pos, p.d, st); break
            case 'D': down(pos, p.d, st); break
            default: console.error("Unknown op: ", p.op); process.exit(-1)
        }
    })
}

function compute() {
    let crossings = []
    let expand = p => p
    let comparer = (a,b) => { let dx = a.x - b.x; return dx != 0 ? dx : a.y - b.y }
    steps[0] = steps[0].map(expand).sort(comparer);
    steps[1] = steps[1].map(expand).sort(comparer);
    console.log(steps)
    for (let i = 0, j = 0; i < steps[0].length && j < steps[1].length; ) {
        let val = comparer(steps[0][i], steps[1][j])
        if(val === 0) {
            crossings.push(steps[0][i])
            ++i;
            ++j;
        } else if (val < 0) {
            ++i;
        } else {
            ++j;
        }
    }
    //let prev = sortedSteps[0];
    // console.log(sortedSteps)
    /*for(let i = 1; i < sortedSteps.length; i++) {
        if (sortedSteps[i].x === prev.x && sortedSteps[i].y === prev.y) {
            crossings.push(prev)
        }
        prev = sortedSteps[i];
    }*/
     console.log(crossings)
    let dists = crossings.map(p => {
        //p = {x: p/
        return Math.abs(p.x) + Math.abs(p.y)
    })
    // console.log(dists)
    console.log(dists.sort(function(a, b){return a - b}))
    return dists.sort(function(a, b){return a - b})[0]

}

function left(pos, dist, st) {
    for(var i = 0; i < dist; ++i) {
        pos.x -= 1
        st.push(Object.assign({}, pos))
    }
}
function right(pos, dist, st) {
    for(var i = 0; i < dist; ++i) {
        pos.x += 1
        st.push(Object.assign({}, pos))
    }
}
function up(pos, dist, st) {
    for(var i = 0; i < dist; ++i) {
        pos.y -= 1
        st.push(Object.assign({}, pos))
    }
}
function down(pos, dist, st) {
    for(var i = 0; i < dist; ++i) {
        pos.y += 1
        st.push(Object.assign({}, pos))
    }
}