import express from 'express'
import dotenv from 'dotenv'
import { clerkMiddleware } from '@clerk/express'
import fileUpload from 'express-fileupload'
import path from 'path'
import cors from 'cors'
import { createServer } from 'http'
import cron from "node-cron"
import fs from "fs"

import { connectDB } from './lib/db.js'
import { initializeSocket } from './lib/socket.js'

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

const httpServer = createServer(app);
initializeSocket(httpServer)

app._router?.stack?.forEach((layer) => {
  if (layer.route) console.log("Route:", layer.route.path);
  else if (layer.name === "router") console.log("Router middleware:", layer.regexp);
});

app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);

app.use(express.json()) //to parse req.body
app.use(clerkMiddleware()) //adds a check to see if the user is logged in/is admin, adds req.auth
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: path.join(__dirname, 'tmp'), 
  createParentPath: true,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
}))

// cron jobs
const tempDir = path.join(process.cwd(), "tmp");
cron.schedule("0 * * * *", () => {
	if (fs.existsSync(tempDir)) {
		fs.readdir(tempDir, (err, files) => {
			if (err) {
				console.log("error", err);
				return;
			}
			for (const file of files) {
				fs.unlink(path.join(tempDir, file), (err) => {});
			}
		});
	}
});

app.use('/api/users',userRoutes)
app.use('/api/admin',adminRoutes)
app.use('/api/songs',songRoutes)
app.use('/api/albums',albumRoutes)
app.use('/api/stats',statRoutes)
app.use('/api/auth',authRoutes)

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../frontend/dist")));
	app.get("/:wildcard", (req, res) => {
		res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
	});
}

app.use((err, req, res, next) => {
  res.status(500).json({message:process.env.NODE_ENV === 'production' ? 'Internal Server Error': err.message})
})

httpServer.listen(PORT,()=>{
  console.log('Server running at '+PORT);
  connectDB();
})