import { useEffect, useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {GlobalCtx} from "../App"
const moment = require('moment')

const ThreadCards = ({postsToShow}) => {

    const {gState} = useContext(GlobalCtx)
    const {url, token} = gState

    const currentUser = localStorage.getItem("user")

    const handleDelete = (id) => {
        fetch(`${url}/posts/${id}`, {
            method: "delete",
            headers: {
                Authorization: "bearer " + token
            }
        }).then(() => window.location.reload())
    }

    return (
        <section>
            {postsToShow.map(item => {
            return (
                    <div key={item.id} id="thread-card">
                        <h2>{item.author}</h2>
                        <div id="thread-bottom">
                            <h3>{item.title}</h3>
                            <p>{moment(item.created_at).format('l')}</p>
                        </div>
                    {currentUser === item.author ? <div id="delete-div"><button onClick={()=> handleDelete(item.id)}>Delete</button></div> : null}
                    </div>
                    
            ) 
            })}
        </section>
    )
}

export default ThreadCards