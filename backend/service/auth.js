const jwt = require('jsonwebtoken')
const secret = "shashank33456^$%*^"


function setUser(user) {
   return jwt.sign(
     {
       _id: user._id,
       email: user.email,
     },
     secret,
   );
 }
function getUser(token) {
   if (!token) {
     return null; // No token provided
   }
   try {
     return jwt.verify(token, secret); // Verify and decode the token
   } catch (error) {
     console.error("Invalid token:", error.message); // Log the error for debugging
     return null; // Return null for invalid or expired token
   }
 }

module.exports = {
   setUser,
   getUser
}