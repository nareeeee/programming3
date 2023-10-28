// var express = require("express");
// var app = express();

// app.get("/", function(req, res){
// res.send("<h1>Hello world</h1>");
// });

// app.get("/name/:name", function(req, res){
// var name = req.params.name;
// res.send("<h1>Hello " + name +"</h1>");
// });

// app.get("/google", function(req, res){
//     res.redirect('https://chrome.google.com/')
// });

// app.get("/google/:name", function(req, res){
//     var search = req.params.name;
//     res.redirect('https://www.google.com/search?q='+ search)
//     });

// app.listen(3000, function(){
// console.log("Example is running on port 3000");
// });


// var express = require("express");
// var app = express();
// app.use(express.static("."));

// app.get("/", function(req, res){
// res.redirect("java.html");
// });

// app.listen(3000, function(){
// console.log("Example is running on port 3000");
// });

///////////

var express = require("express");
let random = require("./random");

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static("."));

app.get("/", function (req, res) {
    res.redirect("index.html");
});

server.listen(3000, function () {
    console.log("Example is running on port 3000");
});

var Grass = require('./class')
var GrassEater = require('./GrassEater')
var Ligthing = require('./ligthing')
var Predator = require('./predator')
var Tsunami = require('./tsunami')
var Human = require('./human')

grassArr = []
grassEaterArr = []
predatorArr = []
ligthingArr = []
tsunamiArr = []
humanArr = []
matrix = [];
sideX = 35
sideY = 70
side = 15;

function createMatrix() {
    for (i = 0; i < sideX; i++) {
        matrix.push([])
        for (var j = 0; j < sideY; j++) {
            matrix[i].push(0)
        }
    }
    function characters(index, count) {
        for (let a = 0; a < count; a++) {
            var v = Math.floor(random(sideX))
            var w = Math.floor(random(sideY))
            matrix[v][w] = index
        }
    }
    characters(4, 5)
    characters(1, 50)
    characters(2, 20)
    characters(3, 20)
    characters(5, 2)
    characters(6, 50)

    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                var grEa = new GrassEater(x, y, 2)
                grassEaterArr.push(grEa)
            }
            else if (matrix[y][x] == 3) {
                var pre = new Predator(x, y, 3)
                predatorArr.push(pre)
            }
            else if (matrix[y][x] == 4) {
                var L = new Ligthing(x, y, 4)
                ligthingArr.push(L)
            }
            else if (matrix[y][x] == 5) {
                var T = new Tsunami(x, y, 5)
                tsunamiArr.push(T)
            }
            else if (matrix[y][x] == 6) {
            
                var H = new Human(x, y, 6)
                humanArr.push(H)
            }
        }
    }
}



function playGame() {
    for (var i in grassArr) {
        grassArr[i].mul()
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
    for (var i in humanArr) {
        humanArr[i].eat()
    }
    io.emit('MATRIX', matrix)
}

io.on("connection", function (socket) {
    createMatrix()
    socket.emit("MATRIX", matrix)

    setInterval(function () { playGame() }, 1000)
})

// io.on("connection", ChangeColors())