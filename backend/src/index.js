import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import adminRoutes from './routes/user.admin.js'
import songRoutes from './routes/user.songs.js'
import albumRoutes from './routes/user.albums.js'
import statRoutes from './routes/user.stats.js'
import authRoutes from './routes/user.auth.js'

dotenv.config();
const app=express();

const PORT=process.env.PORT;

app.use('/api/users',userRoutes)
app.use('/api/admin',adminRoutes)
app.use('/api/songs',songRoutes)
app.use('/api/albums',albumRoutes)
app.use('/api/stats',statRoutes)
app.use('/api/auth',authRoutes)

app.listen(PORT,()=>{
  console.log('Server running at '+PORT);
  
})