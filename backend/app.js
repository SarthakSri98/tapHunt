var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var catalogRouter = require('./routes/catalog');
var paraRouter = require('./routes/paraIndex');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, './angular')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'),
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept'),
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,PUT,DELETE,OPTIONS,authorization'),
    next();
});


//app.use('/image', catalogRouter);
app.use('/para', paraRouter);

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'angular', 'index.html'))
})
module.exports = app;
