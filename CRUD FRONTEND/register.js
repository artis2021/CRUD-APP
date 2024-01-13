const btn = document.querySelector("button")

btn.addEventListener("click", async (event) => {
    event.preventDefault()

    const name = document.querySelector("#name")
    const username = document.querySelector("#username")
    const password = document.querySelector("#password")
    const email = document.querySelector("#email")
    const phone = document.querySelector("#phone")

    const dataToSend = {
        name: name.value,
        username: username.value,
        password: password.value,
        email: email.value,
        phone: phone.value
    }

    baseURL = "http://localhost:3000"

   
    try {
        const response = await fetch(`${baseURL}/users`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataToSend)
        })
        const data = await response.json()

        const output = document.querySelector("#output")

        setTimeout(() => {
            output.innerHTML = ''
        }, 5000)

        const result = document.createElement("div")

        if(data.success == true)
        {
            result.setAttribute("id","success")
            result.innerText = data.data
        }

        else{
            result.setAttribute("id","failure")
            result.innerText = data.message
        }

        output.append(result)

    } catch (error) {
        console.log(error.message)
    }
})