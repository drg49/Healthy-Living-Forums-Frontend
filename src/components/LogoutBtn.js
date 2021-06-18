import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import {GlobalCtx} from "../App"

//contains the signup, login, and logout links
const LogoutBtn = () => {

    const {gState, setGState} = useContext(GlobalCtx)

        const logout = (<Link><h2 onClick={() => {
            localStorage.clear()
            setGState({...gState, token: null})
        }}>Logout</h2></Link>)

    return <button>{logout}</button>
}

export default LogoutBtn