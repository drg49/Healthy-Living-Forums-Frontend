import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import {GlobalCtx} from "../App"
import SingleThread from "../components/SingleThread";
import AddComment from "../components/AddComment";
import Comments from "../components/Comments";
const postsPerPage = 3;
let arrayForHoldingPosts = [];

const Thread = (props) => {

    const id = props.match.params.id

    const {gState} = useContext(GlobalCtx)
    const {url, token} = gState
    const [thread, setThread] = useState(null)

    const [postsToShow, setPostsToShow] = useState([]);
    const [next, setNext] = useState(3);

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
            <AddComment postid={id} />
            <Comments postsToShow={postsToShow}/>
            <button onClick={handleShowMorePosts}>Show More Replies</button>
        </div>
    )
     
}

export default Thread