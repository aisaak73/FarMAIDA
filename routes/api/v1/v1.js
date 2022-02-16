const express = require('express');
const router = express.Router();
const {verifyApiHeaderToken} = require('./headerVerifyMiddleware')
const presentacionesRoutes = require('./presentaciones/presentaciones');


router.use('/presentaciones',
verifyApiHeaderToken,
presentacionesRoutes);

module.exports = router;