import express from 'express'
import cors from 'cors'
import jobRoutes from './routes/jobRoutes.js'
import userRoutes from './routes/userRoutes.js'
import connectDB from './data/db.js'
import dotenv from 'dotenv';

dotenv.config()
connectDB()

const app=express()

app.use(express.json())

app.use(cors())


app.use('/api/job', jobRoutes)
app.use('/api/users', userRoutes)


const PORT = 8080;

app.listen(PORT,()=>console.log(`Running at port ${PORT}`))