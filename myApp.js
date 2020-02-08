
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// --> 7)  Mount the Logger middleware here
let logInfo = function (req, res, next){
    console.log(req.method + " " + req.path + " - " + req.ip)
    next()
}
app.use(logInfo)


// --> 11)  Mount the body-parser middleware  here
let urlEncoded = bodyParser.urlencoded({extended: false})
app.use(urlEncoded)

/** 1) Meet the node console. */



/** 3) Serve an HTML file */
console.log("Hello World");

/** 2) A first working Express Server */
app.get("/", function (req, res) {
    absolutePath = __dirname + "/views/index.html"
    res.sendFile(absolutePath);
})

/** 4) Serve static assets  */
app.use(express.static(__dirname + "/public"))

/** 5) serve JSON on a specific route */


/** 6) Use the .env file to configure the app */
let sendJson = function (req, res) {
    let message = "Hello json"
    if (process.env.MESSAGE_STYLE === "uppercase") {
        message = message.toUpperCase()
    }
    let json = { "message": message }
    res.json(json)
}

app.get("/json", sendJson)


/** 7) Root-level Middleware - A logger */
//  place it before all the routes !


/** 8) Chaining middleware. A Time server */
app.get('/now', function (req, res, next){
 req.time = new Date().toString();
 next()   
}, function(req, res){
    res.send({"time": req.time})
})

/** 9)  Get input from client - Route parameters */
app.get("/:word/echo",function(req, res){
    res.send({"echo": req.params.word})
})

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
// app.get('/name', function(req, res){
//     res.send({name: req.query.first+" " + req.query.last})
// })

/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !


/** 12) Get data form POST  */
app.route('/name').get(function(req, res){
    res.send({name: req.query.first+" " + req.query.last})
}).post(function(req, res){
    res.send({name: req.body.first+" " + req.body.last})
})


// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

module.exports = app;
