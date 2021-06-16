import React, {useContext, useState, useEffect} from 'react'
import {GlobalCtx} from "../App"

const Login = (props) => {

    const {gState, setGState} = useContext(GlobalCtx)
    const {url} = gState

    const blank = {
        username: "", 
        password: ""
    }

    const [form, setForm] = useState(blank)
    const [errorText, setErrorText] = useState("")

    const handleChange = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const {username, password} = form

        fetch(`${url}/login`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username, password})
        })
        .then(response => response.json())
        .then((data) => {
            if(data.error) {
                setErrorText("Invalid username or password.")
            } else {
                localStorage.setItem("token", JSON.stringify(data))
                setGState({...gState, token: data.token})
                setForm(blank) //reset the form
                props.history.push("/")
            }
        })
    }

    const preventSpace = (e) => {
        if (e.key === " ") {
            e.preventDefault();
        }
    }

    useEffect(() => {
        document.body.style.backgroundColor ="yellow"
    })


    return <nav>
        <div>
            <p>{errorText}</p>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" value={form.username} onChange={handleChange} placeholder="Username" onKeyDown={preventSpace} minLength="3" maxLength="15" required/>
                <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" minLength="3" maxLength="30" required/>
                <input type="submit" value="Login" />
            </form>
        </div>
    </nav>
}

export default Login