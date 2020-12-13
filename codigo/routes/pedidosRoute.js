
var express = require('express');
var router = express.Router();
var pedidoModel = require("../models/pedidosModel");

router.get('/', async function(req, res, next) {
  let result = await pedidoModel.getAll();
  res.status(result.status).
     send(result.data);
});

module.exports = router;