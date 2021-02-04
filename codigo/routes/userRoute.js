
var express = require('express');
var router = express.Router();
var userModel = require("../models/userModel");


router.get('/:user', async function(req, res, next) {
  let user= req.params.user;
  let result = await userModel.getId(user);
  res.send(result.data);
});

router.get('/info/:id', async function(req, res, next) {
  let id= req.params.id;
  let result = await userModel.getUserInfo(id);
  res.send(result.data);
});


module.exports = router;