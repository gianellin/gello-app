
const express = require('express');
const router = express.Router();
const movieCtrl = require('../controllers/movies');

// Update, and Delete and maybe compareIndex??
router.use(require('../config/auth'));
router.post('/', movieCtrl.create);
router.get('/index', movieCtrl.index);

module.exports = router;