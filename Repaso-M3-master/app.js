'use strict';

var express = require('express');
var app = express();

module.exports = app; // esto es solo para testear mas facil

// acuerdense de agregar su router o cualquier middleware que necesiten aca

/*
    1. Deberian traer las rutas de la carpeta routes.
    2. Fijense bien en la forma que se exporta el modulo routes/index.js, para poder traerlo y utilizarlo correctamente
*/

const { router } = require('./routes/index.js');
app.use(router);



// el condicional es solo para evitar algun problema de tipo EADDRINUSE con mocha watch + supertest + npm test.
if (!module.parent) app.listen(3000);