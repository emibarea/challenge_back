const express = require('express');
const { getFacturas } = require('../controllers/facturasController');
const { authenticateRoute } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authenticateRoute, getFacturas);


module.exports = router;