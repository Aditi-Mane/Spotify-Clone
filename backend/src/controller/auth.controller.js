import {User} from '../models/user.model.js'

export const authController = async (req, res, next)=>{
  try {
    const {id, firstName, lastName, imageUrl}=req.body
    //fields that are being used by clerk, must write them as they are

    //to check if user already present in db
    const user= await User.findOne({clerkId:id})

    if(!user){
      await User.create({
        clerkId:id,
        fullName: `${firstName || ""} ${lastName || ""}.trim`,
        imageUrl
      })
    }
    res.status(200).json({success:true})

  } catch (error) {
    console.log('Error in auth callback',error);
    next(error)
  }
}