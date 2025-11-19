import express from 'express'
import dotenv from 'dotenv'
import router from './routes/authRouter'
import { connectDB } from './config/database'
import morgan from 'morgan'
import cors from 'cors'

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json());
app.use(morgan("dev"))

const port = 3000

connectDB()

app.get('/', (req, res) => {
    res.status(200).json({ message: "Hello world" });
})

app.use('/api', router)

app.listen(port, () => {
    console.log('server running on port 3000')
})