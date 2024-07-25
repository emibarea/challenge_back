const express = require('express');
const { getUser, updateUser } = require('../controllers/userController');
const { authenticateRoute } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/getData', authenticateRoute, getUser);
router.put('/update', authenticateRoute, updateUser);

module.exports = router;