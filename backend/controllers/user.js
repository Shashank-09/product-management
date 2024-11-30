const User = require('../models/user')
const {setUser} = require('../service/auth')
const {v4 : uuidv4}  = require('uuid')


async function handleUserSignUp(req , res){
  try {
    const {name , email , password} = req.body
    const existingUser = await User.findOne({ 
        $or: [{ name }, { email }] 
      });  
      if (existingUser) {
        return res.status(400).json({
          message: 'Name or Email already exists',
        });
      }  
    const user =  await User.create({
       name,
       email,
       password
    })
    res.status(200).json({
     message: 'User added successfully',
     user,
   });
  } catch (error) {
    res.status(400).json({
        message: 'Error adding user',
        error : error.message
    })
  }
}

async function handleUserLogin(req, res) {
  try {
    const { email, password } = req.body;
    const user =  await User.findOne({ email, password });
    if(!user) {
      return res.status(400).send('Invalid email or password');
    }
     const token = setUser(user);
     console.log("token" , token)
     res.cookie('uid', token, {
      httpOnly: true, // Prevent client-side access
      secure: false, // Set to true for HTTPS
      sameSite: 'lax', // Ensure cookies are sent with same-site requests
    });    
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error); 
       res.status(400).json({
         message: 'Error logging in user',
         error: error.message,
     });
     }
  }




// async function handleUserLogin(req, res) {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email, password });
//     if (!user) {
//       return res.status(400).send('Invalid email or password');
//     }
//     const token = setUser(user);
//     console.log("Generated Token:", token);
//     res.cookie('uid', token, {
//       httpOnly: true,
//       secure: false, // Use `true` if HTTPS
//       sameSite: 'None', // Required for cross-origin
//       maxAge: 24 * 60 * 60 * 1000, // Optional: 1 day expiration
//     });    
//     res.status(200).json({ message: 'Login successful' });
//   } catch (error) {
//     console.error('Error during login:', error); 
//     res.status(400).json({
//       message: 'Error logging in user',
//       error: error.message,
//     });
//   }
// }
  



module.exports = {
    handleUserSignUp,
    handleUserLogin
}