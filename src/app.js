import express from 'express'
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import cookieParser from 'cookie-parser';
import postRoutes from './routes/postRoutes.js'

const app = express()

app.use(express.json());
app.use(morgan('dev'))
app.use(cookieParser())

//Routes
app.use('/api/auth', authRoutes)
app.use('/api', userRoutes)
app.use('/api', postRoutes)

export default app
