import React, {useContext, useState} from 'react'
import {GlobalCtx} from "../App"
import Title from '../components/Title'

const Signup = (props) => {

    const {gState} = useContext(GlobalCtx)
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

        fetch(`${url}/signup`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username, password})
        })
        .then(response => response.json())
        .then(data => {
            setForm(blank) //reset the form
            if(data.error) {
                setErrorText("This username already exists. Please choose another one.")
            } else {
            props.history.push("/login")
            }
        })
    }

    const preventSpace = (e) => {
        if (e.key === " ") {
            e.preventDefault();
        }
    }

    return (
        <>
            <Title />
            <div id="form-div">
                <p id="error-text">{errorText}</p>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="username" value={form.username} onChange={handleChange} placeholder="Username" onKeyDown={preventSpace} minLength="3" maxLength="15" required/>
                    <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" minLength="3" maxLength="30" required/>
                    <input type="submit" value="Signup" id="signup"/>
                </form>
            </div>
        </>
    )   
}

export default Signup