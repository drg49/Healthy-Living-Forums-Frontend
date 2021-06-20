import { useContext } from "react";
import { useHistory } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {GlobalCtx} from "../App"
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
const moment = require('moment')

const trash = <FontAwesomeIcon icon={faTrashAlt} />

const ThreadCards = ({postsToShow}) => {

    let history = useHistory()

    const {gState} = useContext(GlobalCtx)
    const {url, token} = gState

    const currentUser = localStorage.getItem("user")

    const handleDelete = (id, e) => {
        e.stopPropagation() //Since we have an onClick div inside another onClick div, we have to pass this event handler. 
        fetch(`${url}/posts/destroyall/${id}`, {
            method: "delete",
            headers: {
                "Authorization": "bearer " + token
            }
        }).then(() => window.location.reload())
    }

    const goToPost = (id) => {  
        history.push(`/thread/${id}`)
        window.location.reload()
    }

    return (
        <section>
            {postsToShow.map(item => {
            return (
                <div key={item.id} id="thread-card" onClick={()=> goToPost(item.id)}>
                    <h2>{item.author}</h2>
                    <div id="thread-bottom">
                        <h3>{item.title}</h3>
                        <p>{moment(item.created_at).format('l')}</p>
                    </div>
                {currentUser === item.author ? <div id="delete-div"><button onClick={(e)=> handleDelete(item.id, e)}>{trash}</button></div> : null}
                </div>
            ) 
            })}
        </section>
    )
}

export default ThreadCards