import {User} from '../models/user.model.js'

export const authController = async (req,res)=>{
  try {
    const {id,firstName,lastName,imageUrl}=req.body

    //to check if user already present in db
    const user= await User.findOne({clerkId:id})

    if(!user){
      await User.create({
        clerkId:id,
        fullName: `${firstName} ${lastName}`,
        imageUrl
      })
    }
    res.status(200).json({success:true})

  } catch (error) {
    console.log('Error in auth callback',error);
    res.status(500).json({message:'Invalid user',error})
  }
}