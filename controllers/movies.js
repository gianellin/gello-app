import User from "../models/user.js";
import Movie from '../models/movie.js';
import {s3} from '../config/s3-config.js';

import { v4 as uuidv4 } from "uuid";
// since we are sharing code, when you pull you don't want to have to edit the
// the bucket name, thats why we're using an environment variable
const BUCKET_NAME = process.env.BUCKET_NAME;

export default {
  create,
  index,
  deleteMovie,
};
function create(req, res) {
  console.log(req.user, " <- req.user", req.body, req.file)

  if(!req.file) return res.status(400).json({err: 'No file was submitted'});

  // generate our key for our photo on aws
  const key = `gello/movies/${uuidv4()}-${req.file.originalname}`;
  const params = { Bucket: BUCKET_NAME, Key: key, Body: req.file.buffer}
  // upload image to aws
  s3.upload(params, async function(err, data){
    console.log('========================')
    console.log(err, ' err from aws')
    console.log('========================')
    if (err) return res.status(400).json({err: 'Check terminal error from aws'})

    try {
      // adding our information to the database
      const movie = await Movie.create({
        user: req.user._id,
        title: req.body.title,
        photoUrl: data.Location // <- this is from aws, it is the URL that our picture exists at in s3 bucket
      })

      await movie.populate('user')// populating on a document "movie"
      // respond to the client
      res.status(201).json({movie})


    } catch(err){
      res.status(400).json({err})
    }
  })// end of s3 upload  
}

async function index(req, res) {
  try {
    // this populates the user when you find the movies
    // so you'll have access to the users information
    // when you fetch the movies
    const movies = await Movie.find({}).populate("user").exec(); // populating on the model
    res.status(200).json({ data: movies });
  } catch (err) {
    res.status(400).json({ err });
  }
}
async function deleteMovie(req, res) {
  try {
      await Trip.findByIdAndDelete(req.params.id);
      res.json({ data: 'trip removed' })
  } catch (err) {
      res.status(400).json({ err });
  }
}