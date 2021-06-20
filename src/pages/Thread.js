import { useContext, useEffect, useState } from "react";
import {GlobalCtx} from "../App"
import SingleThread from "../components/SingleThread";
import AddComment from "../components/AddComment";
import Comments from "../components/Comments";
const postsPerPage = 5;
let arrayForHoldingPosts = [];

const Thread = (props) => {

    const id = props.match.params.id

    const {gState} = useContext(GlobalCtx)
    const {url, token} = gState
    const [thread, setThread] = useState(null)

    const [postsToShow, setPostsToShow] = useState([]);
    const [next, setNext] = useState(5);
    const [postLength, setPostLength] = useState(null)

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

    const loopWithSlice = (start, end, val) => {
        const slicedPosts = val.slice(start, end)
        arrayForHoldingPosts = [...arrayForHoldingPosts, ...slicedPosts];
        setPostsToShow(arrayForHoldingPosts);
      };

    const getComments = (a, b) => {
        fetch(`${url}/comments/post/${id}`, {
            method: "get",
            headers: {
                "Authorization": "bearer " + token
            }
        }).then(response => response.json())
        .then((data) => {
            setPostLength(data.length)
            loopWithSlice(a, b, data.reverse())
        })
    }

    useEffect(() => {
        async function fetchData() {
            await getThread()
            getComments(0, postsPerPage)
        }
        fetchData()
    }, [])

    const handleShowMorePosts = () => {
        getComments(next, next + postsPerPage);
        setNext(next + postsPerPage);
      };

    return (
        <div>
            {thread}
            {thread ? <AddComment postid={id} /> : null}
            <Comments postsToShow={postsToShow}/>
            {postLength !== postsToShow.length && postLength > 5 ? <button onClick={handleShowMorePosts} id="show-more">Show More</button> : null}
        </div>
    )
     
}

export default Thread