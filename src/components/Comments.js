import { useContext, useState } from 'react'
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
    const [editForm, setEditForm] = useState(null)
    const [currentID, setCurrentID] = useState(null)
    let idVar;

    const handleDelete = (id) => {
        fetch(`${url}/comments/${id}`, {
            method: "delete",
            headers: {
                "Authorization": "bearer " + token
            }
        }).then(() => window.location.reload())
    }

    const handleChange = (event) => {
        setEditForm(<div id="create-caption"><textarea type="text" onChange={handleChange} id="update" value={event.target.value} name="body" maxLength="1000"></textarea><br /><button id="upload-btn" onClick={() => handleUpdate(idVar)}>Done</button></div>)
    }

    const beginUpdate = (id, body) => {
        setEditForm(<div id="create-caption"><textarea type="text" onChange={handleChange} id="update" value={body} name="body" maxLength="1000"></textarea><br /><button onClick={() => handleUpdate(id)}>Done</button></div>)
        setCurrentID(id)
        idVar = id
    }

    const handleUpdate = (id) => {
        const body = document.getElementById("update").value
        fetch(url + "/comments/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "bearer " + token
            },
            body: JSON.stringify({body})
        })
        .then(() => window.location.reload())
    }

    return (
        <section>
            {postsToShow.map((item) => {
                return (
                    <div key={item.id} id="comment-box">
                        <section>
                            <h3>{item.author}</h3>
                            <p>{moment(item.created_at).format('l')}</p>
                        </section>
                        {editForm && currentUser === item.author && currentID === item.id ? editForm : <p id="comment-body">{item.body}</p>}
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