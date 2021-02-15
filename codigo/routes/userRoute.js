
var express = require('express');
var router = express.Router();
var userModel = require("../models/userModel");


/* router.get('/login/:userType/:username', async function(req, res, next) {
  let username= req.params.username;
  let userType= req.params.userType;
  let result = await userModel.getId(username, userType);
  res.send(result.data);
}); */

/* router.get('/perfil/:userType/:id', async function(req, res, next) {
  console.log(req.params.id);
  let id= req.params.id;
  let userType= req.params.userType;
  let result = await userModel.getUserInfo(id, userType);
  res.send(result.data);
}); */

router.get('/perfil/:userId', async function(req, res, next) {
  let userId = req.params.userId;
  let result = await userModel.getPerfil(userId);
  res.send(result.data);
});

router.get('/login/:username/:password', async function(req, res, next) {
  let username = req.params.username;
  let password = req.params.password;
  let result = await userModel.getLogin(username,password);
  res.send(result.data);
});

module.exports = router;