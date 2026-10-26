import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from 'cookie-parser'
import path from "path"

import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import ideaRoutes from './routes/ideaRoutes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const __dirname = path.resolve()

if(process.env.NODE_ENV !== "production"){
  app.use(
    cors({
      origin: 'http://localhost:5173',
      credentials: true,
    })
  )
}
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use('/api/ideas', ideaRoutes)

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "../frontend/dist")))
  
  app.get("/{*splat}", (req, res) => {
      res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
  })
}

const startServer = async () => {
    await connectDB()
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
}

startServer()