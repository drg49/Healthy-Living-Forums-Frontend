import React, { useContext } from 'react'
import {useHistory} from 'react-router-dom'
import {GlobalCtx} from "../App"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser, faHome} from '@fortawesome/free-solid-svg-icons'

const user = <FontAwesomeIcon icon={faUser} />
const home = <FontAwesomeIcon icon={faHome} />

const Header = (props) => {

    let history = useHistory()

    const {gState} = useContext(GlobalCtx)

    const goToProfile = () => {
        history.push("/myprofile")
        window.location.reload()
    }

    const myProfile = <h2 onClick={goToProfile}>{user}</h2>

    const goToHome = () => {
        history.push("/")
        window.location.reload()
    }

    const topics = <h2 onClick={goToHome}>{home}</h2>

    return <nav>
        {gState.token ? myProfile : null}
        {gState.token ? topics : null}
    </nav>
}

export default Header