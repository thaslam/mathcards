var express = require('express');
var router = express.Router();
var userModel = require('../models/UserModel');

router.get('/', function (req, res) {
  var scripts = [{ script: '/js/start.js' }];
  var styles = [{ style: '/css/start.css' }];
  res.render('start', {
    scripts: scripts, styles: styles, 
    model: userModel.getUsers()});
});

router.get('/addition/:id', function(req, res) {
  var scripts = [
    { script: '/js/mathengine.js' }, 
    { script: '/js/pagebase.js' }, 
    { script: '/js/addition.js' }];
  var styles = [{ style: '/css/math.css' }];
  res.render('math', {
    scripts: scripts, styles: styles, 
    model: userModel.getUserById.bind(userModel)(req.params.id)});
});

router.get('/subtraction/:id', function(req, res) {
  var scripts = [
    { script: '/js/mathengine.js' }, 
    { script: '/js/pagebase.js' }, 
    { script: '/js/subtraction.js' }];
  var styles = [{ style: '/css/math.css' }];
  res.render('math', {
    scripts: scripts, styles: styles, 
    model: userModel.getUserById.bind(userModel)(req.params.id)});
});

router.get('/multiplication/:id', function(req, res) {
  var scripts = [
    { script: '/js/mathengine.js' }, 
    { script: '/js/pagebase.js' }, 
    { script: '/js/multiplication.js' }];
  var styles = [{ style: '/css/math.css' }];
  res.render('math', {
    scripts: scripts, styles: styles, 
    model: userModel.getUserById.bind(userModel)(req.params.id)});
});

router.get('/division/:id', function(req, res) {
  var scripts = [
    { script: '/js/mathengine.js' }, 
    { script: '/js/pagebase.js' }, 
    { script: '/js/division.js' }];
  var styles = [{ style: '/css/math.css' }];
  res.render('math', {
    scripts: scripts, styles: styles, 
    model: userModel.getUserById.bind(userModel)(req.params.id)});
});

router.get('/about', function(req, res) {
  var scripts = [];
  var styles = [];
  res.render('about', {scripts: scripts, styles: styles});
});

module.exports = router;
