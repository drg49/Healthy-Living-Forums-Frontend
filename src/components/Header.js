import React, { useContext } from 'react'
import {Link, useHistory} from 'react-router-dom'
import {GlobalCtx} from "../App"

//contains the signup, login, and logout links
const Header = (props) => {

    let history = useHistory()

    const {gState} = useContext(GlobalCtx)

    const goToProfile = () => {
        history.push("/myprofile")
        window.location.reload()
    }

    const myProfile = <h2 onClick={goToProfile}>My Profile</h2>

    const goToHome = () => {
        history.push("/")
        window.location.reload()
    }

    const topics = <h2 onClick={goToHome}>Topics</h2>

    return <nav>
        {gState.token ? myProfile : null}
        {gState.token ? topics : null}
    </nav>
}

export default Header