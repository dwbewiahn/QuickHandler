
var express = require('express');
var router = express.Router();
var pedidoModel = require("../models/pedidosModel");

router.get('/', async function(req, res, next) {
  let result = await pedidoModel.getAll();
  res.status(result.status).
     send(result.data);
});

router.get('/:pos', async function(req, res, next) {
  let pos= req.params.pos;
  let result = await pedidoModel.getOne(pos);
  res.send(result);
});

router.post('/', async function(req, res, next) {
  let pedido= req.body;
  let newPedido = await pedidoModel.postPedido(pedido);
  res.send(newPedido);
});

// router.get('/:pos1/:pos2', async function(req, res, next) {
//   let pos1= req.params.pos1;
//   let pos2= req.params.pos2;
//   let result = await pedidoModel.getOne(pos1,pos2);
//   res.send(result);
// });

module.exports = router;