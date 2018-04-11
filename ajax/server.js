var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');

var app = express();
var upload = multer();

app.set('views', './view');
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({extended: true}));
app.use(upload.array());
app.use('/static', express.static('public'));


/** index **/
app.get('/', function(req, res) {
    res.render('index');
});


/** transfer data **/
/* text data */
app.post('/getData/text', function(req, res) {
    res.format({
        'text/plain': function() {
            res.send("hello i'm text data :)");
        }
    });
});

/* json data */
app.post('/getData/json', function(req, res) {
    res.format({
        'application/json': function() {
            res.send({
                message: "hello i'm json data :)"
            });
        }
    });
});

/* html data */
app.post('/getData/html', function(req, res) {
    res.send('<div class="wrap"><p class="txt">hello i\'m html data :)</p></div>')
});

/* xml data */
app.post('/getData/xml', function(req, res) {
    res.format({
        'application/xml': function() {
            res.send('<test attr="value"></test>');
        }
    });
});


/** check request body **/
app.get('/checkGet/form', function(req, res) {
    res.send(req.query)
});

app.post('/check/form', function(req, res) {
    res.send(req.body)
});

app.get('/jsonp', function(req, res) {
    res.jsonp({
        message: "hello i'm jsonp :)"
    })
});

/** listen **/
app.listen(7777, function() {
    console.log('web server started');
});