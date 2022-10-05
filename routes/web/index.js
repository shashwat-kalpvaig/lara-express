const router = require("express").Router();

const tutorialRoutes = require("./turorial.routes");
const homeRoutes = require('./home.routes');
const rootRoutes =  require('./rootRoutes')

var app = require('express')(); 

app.use('/tutorial', tutorialRoutes)
app.use('/home', homeRoutes);
app.use('/', rootRoutes);

module.exports = app;
 