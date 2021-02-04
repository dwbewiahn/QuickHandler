
var express = require('express');
var router = express.Router();
var userModel = require("../models/userModel");


router.get('/getId/:user/:userType', async function(req, res, next) {
  let user= req.params.user;
  let userType= req.params.userType;
  let result = await userModel.getId(user, userType);
  res.send(result.data);
});

router.get('/getInfo/:id/:userType', async function(req, res, next) {
  console.log(req.params.id);
  let id= req.params.id;
  let userType= req.params.userType;
  let result = await userModel.getUserInfo(id, userType);
  res.send(result.data);
});


module.exports = router;