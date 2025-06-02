const { body } = require('express-validator');

const pacienteValidation = () => {
  return [
    body('nombre')
      .trim()
      .isLength({ min: 3, max: 30 })
      .withMessage('El nombre debe tener entre 3 y 30 caracteres')
      .matches(/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/)
      .withMessage('El nombre solo puede contener letras y espacios'),
    body('apellido')
      .trim()
      .isLength({ min: 3, max: 30 })
      .withMessage('El apellido debe tener entre 3 y 30 caracteres')
      .matches(/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/)
      .withMessage('El apellido solo puede contener letras y espacios'),
    body('dni')
      .trim()
      .isLength({ min: 7, max: 15 })
      .withMessage('El DNI debe tener entre 7 y 15 caracteres')
      .matches(/^[0-9\.]+$/)
      .withMessage('El DNI solo puede contener números y puntos'),
    body('telefono')
      .trim()
      .isLength({ min: 7, max: 15 })
      .withMessage('El teléfono debe tener entre 7 y 15 caracteres')
      .matches(/^[0-9\s\-]+$/)
      .withMessage('El teléfono solo puede contener números, espacios o guiones'),
    body('fecha_nacimiento')
      .isDate()
      .withMessage('Fecha de nacimiento inválida')
      .custom(value => {
        const fecha = new Date(value);
        const hoy = new Date();
        if (fecha > hoy) {
          throw new Error('La fecha de nacimiento no puede ser posterior a hoy');
        }
        return true;
      }),
  ];
};

const validarDniBusqueda = [
  body('dni')
    .trim()
    .customSanitizer(value => value.replace(/\./g, '')) 
    .isLength({ min: 7, max: 10 })
    .withMessage('El DNI debe tener entre 7 y 10 dígitos')
    .isNumeric()
    .withMessage('El DNI solo puede contener números'),
];



module.exports = {
  pacienteValidation,
  validarDniBusqueda,
};