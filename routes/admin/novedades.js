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

router.get('/Admin/novedades/agregar', (req, res, next) => {
  res.render('Admin/agregar', {
    layout:'admin/layout'
  });
});

router.post("/Admin/novedades/agregar", async (req, res, next) => {
  try {
    if (req.body.nombre != "" && req.body.apellido != "" && req.body.edad != "") {
      await novedadesModel.insertNovedad(req.body);
      res.redirect('Admin/novedades')
    } else {
      res.render ('Admin/agregar', {
        layout: 'Admin/layout',
        error: true, message: 'todos los campos son requeridos'
      })
    }
  } catch (error) {
    console.log(error)
    res.render('Admin/agregar', {
      layout: 'Admin/layout',
      error: true, message: 'No se cargo la novedad'
    })
  }
})

module.exports = router;