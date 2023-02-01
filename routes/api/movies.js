import express from 'express';
const router = express.Router();
import movieCtrl from '../controllers/movies.js'
import multer from 'multer'
const upload = multer()

//Update, and Delete and maybe compareIndex??
router.use(require('../config/auth'));
router.post('/', movieCtrl.create);
router.get('/index', movieCtrl.index);



export default router;