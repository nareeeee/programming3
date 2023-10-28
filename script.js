var socket = io();
var side = 20, m = 40, n = 40;
var matrix = []

let colors = {
    grey: "grey",
    green: "green",
    yellow: "yellow",
    red: "red",
    white: "white",
    blue: "blue",
    skinColor: "#EBC3BB"
}

let my_btn = document.getElementById("btn")
my_btn.addEventListener("click", Summer)

function Summer(evt) {
    if (evt.srcElement.innerText == "Summer"){
        let colors = {
            grey:"#95C67F",
            green: "green",
            yellow: "#F6FF8D",
            red:"#AB3D3D",
            white: "white",
            blue: "#276FA7",
            skinColor: "#D2AB79"
        }
    }
}

function setup() {
    createCanvas(n * side, m * side);
    background('#acacac');
}

function drawful(m) {
    matrix = m
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill(colors.green);
            }
            else if (matrix[y][x] == 0) {
                fill(colors.grey);
            } else if (matrix[y][x] == 2) {
                fill(colors.yellow);
            }
            else if (matrix[y][x] == 3) {
                fill(colors.red);
            }
            else if (matrix[y][x] == 4) {
                fill(colors.white);
            }
            else if (matrix[y][x] == 5) {
                fill(colors.blue);
            }
            else if (matrix[y][x] == 6) {
                fill(colors.skinColor);
            }
            rect(x * side, y * side, side, side);
        }
    }
}


socket.on('MATRIX', (m) => {
    matrix = m
})

socket.on('MATRIX', (m) => {
    drawful(m)
})

// function ChangeColors(){
//     socket.emit("ChangeColors")
// }