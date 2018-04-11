var express = require('express');
var app = express();

app.set('views', './view');
app.set('view engine', 'ejs');

app.use('/static', express.static('public'));

app.get('/', function(req, res) {
    console.log('index page');
    res.render('index');
});

app.post('/text', function(req, res) {
    res.format({
        'text/plain': function() {
            res.send("hello i'm text data :)");
        }
    })
});

app.post('/json', function(req, res) {
    res.format({
        'application/json': function() {
            res.send({
                message: "hello i'm json data :)"
            });
        }
    });
});

app.post('/html', function(req, res) {
    res.send('<div class="wrap"><p class="txt">hello i\'m html data</p></div>')
});

app.listen(7777, function() {
    console.log('web server started');
});