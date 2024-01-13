import { Router } from "express"
import {  updateUser, deleteUser, login, getAllUsers, getUserByUsername, createUser } from "../controllers/user.controllers.js"

const userRouter = Router()

// GET http://localhost:3000/users/
userRouter.get('/', getAllUsers)

// GET http://localhost:3000/users/:username
userRouter.get('/:username', getUserByUsername)

// POST http://localhost:3000/users/
userRouter.post('/', createUser)

// PATCH(Update) http://localhost:3000/users/:username
userRouter.patch("/:username", updateUser)

// DELETE http://localhost:3000/users/:username
userRouter.delete('/:username', deleteUser)

// POST http://localhost:3000/users/login
userRouter.post("/login", login)

export default userRouter;
