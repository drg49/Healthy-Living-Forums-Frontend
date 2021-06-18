import { useRef, useEffect, useState, useContext } from "react"
import { useHistory } from "react-router"
import {GlobalCtx} from "../App"

const Create = (props) => {
    
    let history = useHistory()
    const [ locationKeys, setLocationKeys ] = useState([]) //Prevent bugs on browser back/forward button
    useEffect(() => {
      return history.listen(location => {
        if (history.action === 'PUSH') {
          setLocationKeys([ location.key ])
        }
        if (history.action === 'POP') {
          if (locationKeys[1] === location.key) {
            setLocationKeys(([ _, ...keys ]) => keys)
            window.location.reload()
          } else {
            setLocationKeys((keys) => [ location.key, ...keys ])
            window.location.reload()
          }
        }
      })
    }, [ locationKeys, ])

    const {gState} = useContext(GlobalCtx)
    const {url, token} = gState

    const [words, setWords] = useState(1000)
    const topic = props.match.params.topic
    const titleRef = useRef()
    const bodyRef = useRef()

    const count = () => {
        setWords(1000 - bodyRef.current.value.length)
    }

    const handleCreate = (e) => {
        e.preventDefault()
        console.log(titleRef.current.value)
        console.log(bodyRef.current.value)
        fetch(`${url}/posts/`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "bearer " + token
            },
            body: JSON.stringify({
                title: titleRef.current.value,
                body: bodyRef.current.value,
                topic: topic
            })
        })
        titleRef.current.value = ""
        bodyRef.current.value = ""
        history.push(`/topic/${topic}`)
        window.location.reload()
    }

    return (
        <>
            <h4>You are starting a new discussion in: {topic}</h4>
            <form id="create-form" onSubmit={handleCreate}>
                <label htmlFor="title">Title:</label><br />
                <input ref={titleRef} type="text" id="title" maxLength="70" required/><br />
                <label htmlFor="message">Message:</label>
                <textarea ref={bodyRef} id="message" maxLength="1000" onKeyUp={count} onKeyDown={count} required></textarea>
                <div id="post-bottom">
                    <p>Characters left: {words}</p>
                    <input type="submit" value="Post"/>
                </div>
            </form>
        </>
    )
}

export default Create