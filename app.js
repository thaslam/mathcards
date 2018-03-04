var path = require('path');
var express = require('express');
var app = express();
var index = require('./routes/index.js');

app.use(express.static(path.join(__dirname, 'public')));
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
console.log("views", path.resolve('views'));

app.use('/', index);

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

module.exports = app;