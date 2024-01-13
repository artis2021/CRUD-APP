window.addEventListener('load', async () => {
    // We will fetch all the users from the backend and then show them onto this page
    const usersContainer = document.getElementById("users")
    try {
        const baseURL = 'http://localhost:3000'
        const response = await fetch(`${baseURL}/users`, {
            method: "GET"
        })
        const data = await response.json();
        const users = data.data
        for(let user of users){
            const userDiv = document.createElement("div")
            userDiv.setAttribute("id", "user")
            const name = document.createElement("h2");
            name.innerText = user.name;
            const username = document.createElement("h3");
            username.innerText = user.username;
            const email = document.createElement("h3");
            email.innerText = user.email;
            const phone = document.createElement("h3")
            phone.innerText = user.phone

            const deleteBtn = document.createElement("button")
            deleteBtn.innerText = "Delete"

            deleteBtn.addEventListener("click", async () => {
                try {
                    const response = await fetch(`${baseURL}/users/${user.username}`, {
                        method: "DELETE"
                    })
                    const data = await response.json();
                    console.log(data)

                    window.location.reload()
                    
                } catch (error) {
                    console.log(error.message)
                }

            })

            userDiv.append(name);
            userDiv.append(username);
            userDiv.append(email);
            userDiv.append(phone);
            userDiv.append(deleteBtn)
            
            usersContainer.append(userDiv)
        }
    } catch (error) {
        console.log(error.message)
    }

})