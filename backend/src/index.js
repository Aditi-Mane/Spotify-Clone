import express from 'express'
import dotenv from 'dotenv'
import { clerkMiddleware } from '@clerk/express'
import fileUpload from 'express-fileupload'
import path from 'path'

import { connectDB } from './lib/db.js'

import userRoutes from './routes/user.route.js'
import adminRoutes from './routes/admin.route.js'
import songRoutes from './routes/songs.route.js'
import albumRoutes from './routes/albums.route.js'
import statRoutes from './routes/stats.route.js'
import authRoutes from './routes/auth.route.js'

dotenv.config();
const app=express();

const __dirname = path.resolve();
const PORT=process.env.PORT;

app.use(express.json()) //to parse req.body
app.use(clerkMiddleware()) //adds a check to see if the user is logged in/is admin, adds req.auth
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: path.join(__dirname, 'tmp'), 
  createParentPath: true,
  limits: { fileSize: 10 * 1024 * 1024 }, // 50 MB
}))

app.use('/api/users',userRoutes)
app.use('/api/admin',adminRoutes)
app.use('/api/songs',songRoutes)
app.use('/api/albums',albumRoutes)
app.use('/api/stats',statRoutes)
app.use('/api/auth',authRoutes)

app.use((err, req, res, next) => {
  res.status(500).json({message:process.env.NODE_ENV === 'production' ? 'Internal Server Error': err.message})
})

app.listen(PORT,()=>{
  console.log('Server running at '+PORT);
  connectDB();
})