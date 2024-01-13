const btn = document.querySelector("button")

btn.addEventListener("click", async (evt) => {
    evt.preventDefault()
    const usernameInput = document.getElementById("username")
    const passwordInput = document.getElementById("password")


    const baseURL = "http://localhost:3000"

    try {
        const dataToSend = {
            username: usernameInput.value,
            password: passwordInput.value
        }
        const response = await fetch(`${baseURL}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend)
        })
        const data = await response.json()

        const output = document.getElementById("output")
        output.innerHTML = '';

        setTimeout(()=>{
            output.innerHTML = ''
            window.location = "./users.html"
        }, 5000)

        const result = document.createElement("div")

        if (data.success == true) {
            result.setAttribute("id", "success")
            result.innerText = data.data
        }
        else {
            result.setAttribute("id", "failure")
            result.innerText = data.message
        }
        
        output.append(result)

    } catch (error) {
        console.log(error)
    }
})