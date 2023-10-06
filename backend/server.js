import express from 'express'
import connectDB from './db/db.js'
import dotenv from 'dotenv'
import recipeRoutes from './routes/recipeRoutes.js'
import userRoutes from './routes/userRoutes.js'

const PORT = process.env.PORT || 5000

dotenv.config()
connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/recipes', recipeRoutes)
app.use('/users', userRoutes)

if(process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })
}

export default app