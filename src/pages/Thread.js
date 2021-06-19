import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import {GlobalCtx} from "../App"
import SingleThread from "../components/SingleThread";
import AddComment from "../components/AddComment";

const Thread = (props) => {

    const id = props.match.params.id

    const {gState} = useContext(GlobalCtx)
    const {url, token} = gState
    const [thread, setThread] = useState(null)

    const getThread = () => {
        fetch(`${url}/posts/${id}`, {
            method: "get",
            headers: {
                "Authorization": "bearer " + token
            }
        }).then(response => response.json())
        .then((data) => {
            setThread(
                <SingleThread
                    author={data.author}
                    title={data.title}
                    body={data.body}
                    date={data.created_at}
                    topic={data.topic}
                    id={data.id}
                    key={data.id}
                />
            )
        })
    }

    const getComments = () => {
        fetch(`${url}/comments/post/${id}`, {
            method: "get",
            headers: {
                "Authorization": "bearer " + token
            }
        }).then(response => response.json())
        .then((data) => {
            console.log(data)
        })
    }

    useEffect(() => {
        async function fetchData() {
            await getThread()
            getComments()
        }
        fetchData()
    }, [])

    return (
        <div>
            {thread}
            <AddComment postid={id} />
            
        </div>
    )
     
}

export default Thread