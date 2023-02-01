import express from 'express';
const router = express.Router();
import usersCtrl from '../controllers/users.js';
import multer from 'multer'
const upload = multer()

/*---------- Public Routes ----------*/
router.post('/signup', upload.single('photo'), usersCtrl.signup);
router.post('/login', usersCtrl.login);
//added search user
router.post('/search', usersCtrl.search)


/*---------- Protected Routes ----------*/




export default router;