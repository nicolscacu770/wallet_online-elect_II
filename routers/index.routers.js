const express = require('express');
const movimientos = require('./movements.router');

//function routers
function router(app) {
    const router = express.Router();
    app.use('/api', router);
    router.use('/movimientos', movimientos);

}

module.exports = router;