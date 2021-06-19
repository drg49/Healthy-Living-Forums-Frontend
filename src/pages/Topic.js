import { useEffect, useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {GlobalCtx} from "../App"
import topicdata from '../components/TopicData.json'
import ThreadCards from "../components/ThreadCards";

const postsPerPage = 3;
let arrayForHoldingPosts = [];

const Topic = (props) => {

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

    const topic = props.match.params.topic

    const name = topicdata.find((item) => {
        return item.name === topic
    })

    const [postsToShow, setPostsToShow] = useState([]);
    const [next, setNext] = useState(3);

    const loopWithSlice = (start, end, val) => {
        const slicedPosts = val.slice(start, end)
        arrayForHoldingPosts = [...arrayForHoldingPosts, ...slicedPosts];
        setPostsToShow(arrayForHoldingPosts);
      };

    const getThreads = (a, b) => {
        fetch(`${url}/posts/topic/${topic}`, {
            method: "get",
            headers: {
                "Authorization": "bearer " + token
            }
        }).then(response => response.json())
        .then(data => {
            console.log(data)
            loopWithSlice(a, b, data.reverse())
        }) 
    }

    useEffect(() => {
        getThreads(0, postsPerPage)
    }, [])

    const handleShowMorePosts = () => {
        getThreads(next, next + postsPerPage);
        setNext(next + postsPerPage);
      };
    
    return  (
        <>
            <h3>{topic}</h3>
            <p>{name.desc}</p>
            <Link to={`/post/${topic}`}><p id="create-btn">Create New Thread</p></Link>
            <ThreadCards postsToShow={postsToShow}/>
            <button onClick={handleShowMorePosts}>Show More</button>
        </>
    )
    
}

export default Topic