var express = require('express');
var router = express.Router();
var novedadesModel = require('../../models/novedadesModel');

router.get('/', async function (req, res, next) {
  
  var novedades = await novedadesModel.getNovedades();

  res.render('Admin/novedades',{
    layout:'Admin/novedades',
    persona: req.session.nombre,
    novedades
  });
});

module.exports = router;