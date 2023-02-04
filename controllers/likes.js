import Movie from '../models/movie.js'

export default {
    create,
    deleteLike
}

async function create(req, res){
 
    try {
        const movie = await Movie.findById(req.params.id);
        movie.likes.push({username: req.user.username, userId: req.user._id}); //mutating a document
        await movie.save()// save it
        res.status(201).json({data: 'like added'})
    } catch(err){
       
        res.status(400).json({err})
    }
    
}

async function deleteLike(req, res){
    try {
        
        const movie = await Movie.findOne({'likes._id': req.params.id, 'likes.username': req.user.username});
        movie.likes.remove(req.params.id)
        await movie.save() 
        res.json({data: 'like removed'})
    } catch(err){
        res.status(400).json({err})
    }
}