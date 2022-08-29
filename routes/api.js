var express = require('express');
var router = express.Router();
var novedadesModel = require('../models/novedadesModel');
var cloudinary = require('cloudinary').v2;
var nodemailer = require('nodemailer');

router.get('/novedades', async function (req, res, next) {
    let novedades = await novedadesModel.getNovedades();

    novedades = novedades.map(novedades => {
        if (novedades.img_id) {
          const imagen = cloudinary.url(novedades.img_id, {
            width: 960,
            height: 200,
            crop: 'fill'
        });
        return {
          ...novedades,
          imagen
          
        }
        } else {
          return {
            ...novedades,
            imagen: ''
          }
        }
        });


    res.json(novedades);
});

router.post('/contacto', async (req, res) => {
  
  const mail = {
    to: 'villalta_gonzalo@hotmail.com',
    subject: 'Contacto Web',
    html: `Hola ${req.body.Nombre}!  Gracias por contactar con Parvadas SensoMarketing  - Su email es: ${req.body.Email} - Su telefono es: ${req.body.Telefono} <br>Que traes en mente? ${req.body.mensaje}<br>`
  }
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
   });

   await transport.sendMail(mail)

   res.status(201).json({
    error:false,
    message: 'Mensaje Enviado'
   });
});

module.exports = router;