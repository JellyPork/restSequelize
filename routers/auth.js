// routers/authRouter.js
const express = require('express');
const router = express.Router();
const { signup, login, jwtDecode } = require('../controllers/authController');

router.post('/signup', signup);
router.post('/login', login);
router.post('/google', jwtDecode);
module.exports = router;
