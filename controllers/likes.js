import Post from '../models/movie.js'

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
        movie.likes.remove(req.params.id) // mutating a document
        // req.params.id is the like id 
        await movie.save() // after you mutate a document you must save
        // res is an object that can respond to the client
        
        res.json({data: 'like removed'})
    } catch(err){
        res.status(400).json({err})
    }
}