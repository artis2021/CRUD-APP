import bcrypt from "bcrypt"

class Database {
    // array of user
    users;
    constructor() {
        this.users = []
    }

    async addUser(user) {
        try {
            const password = user.password;
            const hashedPassword = await bcrypt.hash(password, 10)
            user.password = hashedPassword;
            this.users.push(user)
        } catch (error) {
            console.log('Error hasing pasword.')
            console.log(error.message)
        }
    }

    deleteUser(username) {
        let i = 0;
        let present = false;
        for (; i < this.users.length; i++) {
            if (this.users[i].username == username){
                present = true;
                break;
            }
                
        }

        if(present == false) return;
        console.log(this.users)
        this.users.splice(i, 1);
        console.log(this.users)
    }

    findUser(username) {
        for (let user of this.users) {
            if (user.username == username) return user
        }
        return null
    }

    async updateUser(username, details) {
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].username == username) {
                try {
                    if(details.password){
                        const password = details.password;
                        const hashedPassword = await bcrypt.hash(password, 10);
                        details.password = hashedPassword
                    }

                    this.users[i] = {
                        ...this.users[i],
                        ...details
                    }
                } catch (error) {
                    console.log('Error hasing password')
                }
            }
        }
    }

    getUsers() {
        return this.users;
    }
}

// Database instance
const db = new Database();

export default db;


/*
user = {
    name,
    email,
    password,
    username,
    phone
}
*/

// Database




// db.addUser({
//     name: 'Arti sahu',
//     email: 'arti@gmail.com',
//     username: 'arti',
//     phone: '98992892829',
//     password: '123456'
// })
// console.log(db.getUsers())
// db.updateUser('arti', {
//     name: 'Sahu',
//     email: 'sahu@gmail.com'
// })
// console.log(db.getUsers())



// db.deleteUser('arti')