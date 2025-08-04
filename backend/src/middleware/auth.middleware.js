import { clerkClient } from "@clerk/express";

export const isLoggedIn = async (req,res,next)=>{
  if(!req.auth.userId){
    return res.status(401).json({message:'Unauthorized access - User is not logged in'});
  }
  next();
}

export const isAdmin = async (req, res, next) => {
  try {
    const currentUser = await clerkClient.users.getUser(req.auth.userId);
    const email = currentUser.primaryEmailAddress?.emailAddress;

    if (process.env.ADMIN_EMAIL !== email) {
      return res.status(403).json({ message: 'Unauthorized access - User is not admin' });
    }
    next();
  } catch (error) {
    console.error('Error in isAdmin middleware:', error);
    next(error);
  }
};
