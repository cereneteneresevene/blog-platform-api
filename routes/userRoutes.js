const express = require('express');
const { updateProfile } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();

router.put('/profile', authMiddleware, upload.single('profileImage'), updateProfile);

module.exports = router;
