import { useState, useRef, useContext } from "react"
import {GlobalCtx} from "../App"

const AddComment = ({postid}) => {

    const {gState} = useContext(GlobalCtx)
    const {url, token} = gState
    const [textbox, setTextbox] = useState(null)
    const [word, setWord] = useState(null)

    const commentRef = useRef()

    const count = () => {
        setWord(<p>Characters left: {700 - commentRef.current.value.length}</p>) //Word Count Function
    }

    const cancel = () => { //if user hits 'cancel'
        setTextbox(null)
        setButton(<button onClick={beginReply}>Reply</button>)
    }

    const beginReply = () => { //when user hits 'reply'
        setTextbox(<textarea ref={commentRef} maxLength="700" onChange={count} required></textarea>)
        setWord(<p>Characters left: 700</p>)
        setButton(<div id="comment-btns"><button onClick={cancel}>Cancel</button><button>Add Reply</button></div>)
    }

    const handleCreate = (e) => { //when user hits 'add reply'
        e.preventDefault()
        fetch(`${url}/comments`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "bearer " + token
            },
            body: JSON.stringify({
                body: commentRef.current.value,
                postid: postid
            })
        }).then(() => window.location.reload())
    }

    const [button, setButton] = useState(<button onClick={beginReply}>Reply</button>) //Initial State

    return (
        <form id="add-comment" onSubmit={handleCreate}>
            {textbox}
            <div id="comment-bottom">
                {word}
                {button}
            </div>
        </form>
    )
}

export default AddComment