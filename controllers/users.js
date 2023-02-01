import User from '../models/user.js'
import jwt from 'jsonwebtoken'
const SECRET = process.env.SECRET;


export default {
  signup,
  login,
  search,
  profile,
};
async function profile(req, res){
  try {
    // First find the user using the params from the request
    // findOne finds first match, its useful to have unique usernames!
    const user = await User.findOne({username: req.params.username})
    // Then find all the posts that belong to that user
    if(!user) return res.status(404).json({error: 'User not found'})

    const posts = await Post.find({user: user._id}).populate("user").exec();
    console.log(posts, ' this posts')
    res.status(200).json({data: posts, user: user})
  } catch(err){
    console.log(err)
    res.status(400).json({err})
  }
}

async function signup(req, res) {
  console.log(req.body, req.file, "signup router")
  const user = new User(req.body);
  try {
    await user.save(); // user model .pre('save') function is runnning which hashes the password
    const token = createJWT(user);
    res.json({ token }); // set('toJSON'), in user model is being called, and deleting the users password
  } catch (err) {
    // Probably a duplicate email
    res.status(400).json(err);
  }
}

async function login(req, res) {
 
  try {
    const user = await User.findOne({email: req.body.email});
   
    if (!user) return res.status(401).json({err: 'bad credentials'});
    user.comparePassword(req.body.password, (err, isMatch) => {
      
      if (isMatch) {
        const token = createJWT(user); // when some logs in we create a JWT
        res.json({token});
      } else {
        return res.status(401).json({err: 'bad credentials'});
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}

async function search(req, res) {
	try {

	} catch (err) {

	}
}

/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    {user}, // data payload
    SECRET,
    {expiresIn: '24h'}
  );
}


