import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import {GlobalCtx} from "../App"

//contains the signup, login, and logout links
const Header = (props) => {

    const {gState, setGState} = useContext(GlobalCtx)

        const logout = (<Link><h2 onClick={() => {
            localStorage.removeItem("token")
            setGState({...gState, token: null})
        }}>Logout</h2></Link>)

    return <nav>
        {gState.token ? logout : null}
    </nav>
}

export default Header