var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var pedidosRouter = require('./routes/pedidosRoute');
var userRouter = require('./routes/userRoute');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/pedidos', pedidosRouter);
app.use('/api/user', userRouter);

module.exports = app;
