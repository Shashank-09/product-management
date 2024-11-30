const { getUser } = require("../service/auth");

// async function checkAuth(req, res, next) {
//   console.log('Received Cookies:', req.cookies);
//   const token = req.cookies?.uid; // Extract the token from cookies
//   console.log("token" , token)

//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized: Please log in" });
//   }

//   const user =  getUser(token); // Decode and verify the token
//   if (!user) {
//     return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
//   }

//   req.user = user; // Attach the decoded user info to the request object
//   next(); // Proceed to the next middleware or route handler
// }

async function checkAuth(req , res , next){
  console.log('Cookie Header:', req.headers.cookie);
  console.log('Received Cookies:', req.cookies);
  const userUid = req.cookies?.uid;
  if (!userUid) {
         return res.status(401).json({ message: "Unauthorized: Please log in" });
   }
  const user = getUser(userUid);   
  req.user = user;
  next(); 
}

module.exports = {
  checkAuth,
};
