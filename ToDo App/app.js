var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();

//set up template engine
app.set('view engine', 'ejs');

//static files 
app.use(/*'/assets', */express.static('./public'))

//fire controllers
todoController(app);

//set static file
// localhost:300/assets/style.css

//listen to port
app.listen(3300);
console.log('You are listening to port 3300');