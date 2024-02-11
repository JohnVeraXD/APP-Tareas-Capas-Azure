const { Router } = require('express');
const router = Router();

const {iniciarUserGoogle } = require('../controllers/Auth/auth-controller');

router.post('/LoginGoogle',iniciarUserGoogle);

module.exports = router;