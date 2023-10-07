var matrix = [];
var side = 60;
// var m = prompt("input number")
// var n = prompt("input number")

var m = 10
var n = 10

for (i = 0; i < n; i++) {
    matrix.push([])
    for (var j = 0; j < m; j++) {
        matrix[i].push(0)
    }
}

function characters(index, count) {
    for (let a = 0; a < count; a++) {
        var v = Math.floor(random(0, n))
        var w = Math.floor(random(0, m))
        matrix[v][w] = index
    }
}

var grassArr = []
var grassEaterArr = []
var predatorArr = []
var ligthingArr = []
var tsunamiArr = []
function setup() {
    characters(4,5)
    characters(1, 50)
    characters(2,20)
    characters(3, 20)
    characters(5,2)
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
    // var gr = new Grass(1,2,1)
    // var emptyCells = gr.chooseCell(0)
    // console.log(emptyCells)
    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                var grEa = new GrassEater(x, y, 1)
                grassEaterArr.push(grEa)
            }
            else if (matrix[y][x] == 3) {
                var pre = new Predator(x, y, 1)
                predatorArr.push(pre)
            }
            else if (matrix[y][x] == 4) {
                var L = new Ligthing(x, y, 1)
                ligthingArr.push(L)
            }
            else if (matrix[y][x] == 5) {
                var T = new Tsunami(x, y, 1)
                tsunamiArr.push(T)
            }
        }
    }

}

function draw() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            } else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("white");
            }
            else if (matrix[y][x] == 5) {
                fill("blue");
            }
            rect(x * side, y * side, side, side);
        }
    } for (var i in grassArr) {
        // var emptyCells = grassArr[i].chooseCell(0);
        grassArr[i].mul()
        // console.log(emptyCells);
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].eat()
    }
    for (var i in predatorArr) {
        predatorArr[i].eat()
    }
    for (var i in ligthingArr) {
        ligthingArr[i].kill()
        ligthingArr[i].mul()
    }
    for (var i in tsunamiArr) {
        tsunamiArr[i].kill()
    }
}