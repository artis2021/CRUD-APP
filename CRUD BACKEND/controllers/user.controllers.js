import db from "../DB/index.js"
import bcrypt from "bcrypt"

function getAllUsers(req, res) {
    res.json({
        success: true,
        data: db.getUsers()
    })
}

function getUserByUsername(req, res) {
    const username = req.params.username
    const user = db.findUser(username)
    if (!user) {
        res.json({
            success: false,
            message: "No such user exist"
        })
    }
    else {
        res.json({
            success: true,
            data: user
        })
    }
}

async function createUser(req, res) {
    const user = req.body
    await db.addUser(user)
    res.json({
        success: true,
        data: 'User added succesfully!'
    })
}

async function updateUser(req, res) {
    const username = req.params.username;
    const details = req.body.user
    await db.updateUser(username, details);
    res.json({
        success: true,
        data: 'User updated succesfully!'
    })
}

function deleteUser(req, res) {
    const { username } = req.params
    const user = db.findUser(username);
    if (!user) {
        res.json({
            success: false,
            message: 'No such user exists!'
        })
    } else {
        db.deleteUser(username);
        res.json({
            success: true,
            data: 'Succesfully deleted!'
        })
    }
}

async function login(req, res) {
    const data = req.body
    /*
        {
            username,
            password
        }
    */
    const user = db.findUser(data.username)
    if (!user) {
        res.json({
            success: false,
            message: 'No such user exists!'
        })
        return;
    }

    const hashedPassword = user.password
    try {
        const isValid = await bcrypt.compare(data.password, hashedPassword);
        if(isValid){
            res.json({
                success: true,
                data: 'Login Succesful!'
            })
            return;
        }else{
            res.json({
                success: false,
                message: 'Invalid credentials!'
            })
            return;
        }
    } catch (error) {
        res.json({
            success: false,
            message: 'Error checking password!'
        })
        return;
    }


}

export {
    getAllUsers,
    getUserByUsername,
    createUser,
    updateUser,
    deleteUser,
    login
}
