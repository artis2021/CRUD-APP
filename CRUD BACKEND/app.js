import express from 'express'
import cors from 'cors'
import userRouter from './routes/user.routes.js'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3000, () => {
    console.log("OOh wow server started...")
})

app.get("/", (req, res) => {
    res.send("Welcome to my server.")
})

// Routes
app.use("/users", userRouter)