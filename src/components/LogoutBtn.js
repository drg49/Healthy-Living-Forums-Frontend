import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import {GlobalCtx} from "../App"


const LogoutBtn = () => {

    const {gState, setGState} = useContext(GlobalCtx)

        const logout = (<Link><h3 id="logout" onClick={() => {
            localStorage.clear()
            setGState({...gState, token: null})
        }}>Logout</h3></Link>)

    return <div>{logout}</div>
}

export default LogoutBtn