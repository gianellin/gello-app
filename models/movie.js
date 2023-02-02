import mongoose from 'mongoose';

const likesSchema = mongoose.Schema({
  username: String,
  userId: { type: mongoose.Schema.Types.ObjectId }
})

// A post has many likes, a like belongs to a Movie
const movieSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}, // referencing a model
    photoUrl: String,
    caption: String,
    likes: [likesSchema] // embedded schema// One Movie has many Likes!
    // One Post has many Likes, One to many relationship
    // we are using embedding because likes will always be with the movie, 
    // they don't need their own model, because we will never display likes individually
  })
 

export default mongoose.model('Movie', movieSchema);