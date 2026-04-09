const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/profileController');
const { authenticateUser } = require('../middleware/auth');

router.get('/', authenticateUser, getProfile);
router.put('/', authenticateUser, updateProfile);

module.exports = router;