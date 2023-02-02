import mongoose from 'mongoose';

const likesSchema = mongoose.Schema({
  username: String,
  userId: { type: mongoose.Schema.Types.ObjectId }
})

const movieSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}, // reference
    title: {type: String, required:true},
    description: String,
    photoUrl: String,
    likes: [likesSchema] 
  })
 

export default mongoose.model('Movie', movieSchema);