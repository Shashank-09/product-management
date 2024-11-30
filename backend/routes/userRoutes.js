const express = require('express');
const { handleUserSignUp , handleUserLogin } = require('../controllers/user');
const { checkAuth } = require('../middleware/auth');


const router = express.Router();

router.post('/signup' , handleUserSignUp);
router.post('/signin' , handleUserLogin);

module.exports = router;