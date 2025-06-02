const { validationResult } = require('express-validator');

const ObraSocial = require('../models/ObraSocialModels'); 

const validarResultados = (vista) => {
  return async (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      const obrasSociales = await ObraSocial.findAll();

      return res.render(vista, {
        errores: errores.array(),
        paciente: req.body,
        obrasSociales,
        mainClass: ''
      });
    }
    next();
  };
};
module.exports = validarResultados;
