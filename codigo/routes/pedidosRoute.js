
var express = require('express');
var router = express.Router();
var pedidoModel = require("../models/pedidosModel");

router.get('/', async function (req, res, next) {
  let result = await pedidoModel.getAll();
  res.status(result.status).
    send(result.data);
});

router.get('/:pos', async function (req, res, next) {
  let pos = req.params.pos;
  let result = await pedidoModel.getOne(pos);
  res.send(result.data);
});

router.get('/meusPedidos/:id/:userType', async function (req, res, next) {
  let id = req.params.id;
  let userType = req.params.userType;
  let result = await pedidoModel.getAllMine(id, userType);
  res.status(result.status).
    send(result.data);
});

router.post('/', async function (req, res, next) {
  let pedido = req.body;
  let newPedido = await pedidoModel.postPedido(pedido);
  res.send(newPedido.msg);
});

router.post('/atribuir/', async function (req, res, next) {
  let aPedido = req.body;
  let result = await pedidoModel.atribuirPedido(aPedido);
  res.send(result.msg);
});

module.exports = router;