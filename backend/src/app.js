import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import UserModel from './models/UserModel'


const app = express()
const User = require(UserModel)

app.use(express.json())
app.use(cookieParser())

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true
  })
)

export default app

