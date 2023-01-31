var express = require('express');
var todocontroller = require('./controllers/todocontroller');

var app = express();

app.set('view engine', 'ejs');

app.use(express.static('./public'));

app.listen(3000);

todocontroller(app);