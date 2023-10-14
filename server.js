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


var express = require("express");
var app = express();
app.use(express.static("."));

app.get("/", function(req, res){
res.redirect("java.html");
});

app.listen(3000, function(){
console.log("Example is running on port 3000");
});