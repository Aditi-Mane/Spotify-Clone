//connecting mongodb to our app

import mongoose from 'mongoose'

export const connectDB = async ()=>{
  try {
    const conn=await mongoose.connect(process.env.MONGODB_URI) 
    console.log(`Connected to Mongodb ${conn.connection.host}`);
  } catch (error) {
    console.log('Failed to connect to mongodb', error);
    process.exitCode(1); // 1 is failure, 0 is success
  }
}
