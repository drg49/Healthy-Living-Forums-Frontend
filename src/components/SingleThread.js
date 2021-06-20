import { useContext, useState } from "react";
import { useHistory } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {GlobalCtx} from "../App"
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'
const moment = require('moment')

const trash = <FontAwesomeIcon icon={faTrashAlt} />
const edit = <FontAwesomeIcon icon={faEdit} />

const SingleThread = (props) => {

    let history = useHistory()
    let idVar;
    const {gState} = useContext(GlobalCtx)
    const {url, token} = gState
    const currentUser = localStorage.getItem("user")
    const [currentID, setCurrentID] = useState(null)
    const [editForm, setEditForm] = useState(null)

    const handleDelete = (id) => {
        fetch(`${url}/posts/destroyall/${id}`, {
            method: "delete",
            headers: {
                "Authorization": "bearer " + token
            }
        })
        .then(() => history.push(`/topic/${props.topic}`))
    }

    const handleChange = (event) => {
        setEditForm(<div id="create-caption"><textarea type="text" onChange={handleChange} id="update" value={event.target.value} name="body" maxLength="1000"></textarea><br /><button id="upload-btn" onClick={() => handleUpdate(idVar)}>Done</button></div>)
    }

    const beginUpdate = (id, currentThread) => {
        setEditForm(<div id="create-caption"><textarea type="text" onChange={handleChange} id="update" value={currentThread} name="body" maxLength="1000"></textarea><br /><button onClick={() => handleUpdate(id)}>Done</button></div>)
        setCurrentID(id)
        idVar = id
    }

    const handleUpdate = (id) => {
        const body = document.getElementById("update").value
        fetch(url + "/posts/" + id, {
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
        <div key={props.id} id="single-thread">
            <h2>{props.author}</h2>
            <div id="thread-bottom">
                <h3>{props.title}</h3>
                <p>{moment(props.created_at).format('l')}</p>
            </div>
            {editForm ? editForm : <p>{props.body}</p>}
            {currentUser === props.author ? <div id="delete-div">
            <button onClick={()=> beginUpdate(props.id, props.body)}>{edit}</button>
            <button onClick={()=> handleDelete(props.id, props.topic)}>{trash}</button>
            </div> : null}
        </div>
    )
}

export default SingleThread