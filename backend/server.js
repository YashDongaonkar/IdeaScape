import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from 'cookie-parser'

import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import ideaRoutes from './routes/ideaRoutes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
)
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use('/api/ideas', ideaRoutes)

app.get("/", (req, res) => {
    res.send("HEY THERE!")
})


const startServer = async () => {
    await connectDB()
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
}

startServer()