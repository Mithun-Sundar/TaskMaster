var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Mithun-Sundar:Spms%402002@cluster0.pos2h8k.mongodb.net/test');

// var data = [{ item: 'wake up' }, { item: 'eat' }, { item: 'sleep' }];

var todoschema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoschema);


var urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = function(app) {

    app.get('/todo', function(req, res) {
        Todo.find({}, function(err, data) {
            if (err) throw err;
            res.render('todo', { todos: data });
        });
    });

    app.post('/todo', urlencodedParser, function(req, res) {
        var newTodo = Todo(req.body).save(function(err, data) {
            if (err) throw err;
            res.json(data);
        });
    });

    app.delete('/todo/:item', function(req, res) {
        Todo.find({ item: req.params.item.replace(/\-/g, " ") }).remove(function(err, data) {
            if (err) throw err;
            res.json(data);
        });
    });


};