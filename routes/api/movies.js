import express from 'express';
const router = express.Router();
import moviesCtrl  from '../../controllers/movies.js';
import multer from 'multer'
const upload = multer()
// /*---------- Public Routes ----------*/

// single('photo') matches formData.append('photo', photo) in addPuppyForm

// this the route that processes a request from "React"/browser
// to create a post
router.post('/', upload.single('photo'), moviesCtrl.create);
router.get('/', moviesCtrl.index)
router.delete('/:id', moviesCtrl.deleteMovie)
export default router;