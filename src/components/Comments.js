import { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {GlobalCtx} from "../App"
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'
const moment = require('moment')

const trash = <FontAwesomeIcon icon={faTrashAlt} />
const edit = <FontAwesomeIcon icon={faEdit} />

const Comments = ({postsToShow}) => {

    const currentUser = localStorage.getItem("user")    

    const {gState} = useContext(GlobalCtx)
    const {url, token} = gState

    const handleDelete = (id) => {
        fetch(`${url}/comments/${id}`, {
            method: "delete",
            headers: {
                "Authorization": "bearer " + token
            }
        }).then(() => window.location.reload())
    }

    const beginUpdate = () => {
        
    }

    return (
        <section>
            {postsToShow.map((item) => {
                return (
                    <div key={item.id} id="comment-box">
                        <div>
                            <h3>{item.author}</h3>
                            <p>{moment(item.created_at).format('l')}</p>
                        </div>
                        <p>{item.body}</p>
                        {currentUser === item.author ? <div id="delete-div">
                        <button onClick={()=> beginUpdate(item.id, item.body)}>{edit}</button>
                        <button onClick={()=> handleDelete(item.id)}>{trash}</button>
                        </div> : null}
                    </div>
                )
            })}
        </section>
    )
}

export default Comments