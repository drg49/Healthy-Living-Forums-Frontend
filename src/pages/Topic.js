import { useEffect, useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {GlobalCtx} from "../App"
import topicdata from '../components/TopicData.json'
import ThreadCards from "../components/ThreadCards";
import loading from '../components/loading.gif'

const postsPerPage = 6;
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
    const [next, setNext] = useState(6);
    const [postLength, setPostLength] = useState(null)

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
            setPostLength(data.length)
            data.sort((a, b) => b.id - a.id)
            loopWithSlice(a, b, data)
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
        <div>
            <h3 id="topic-title">{topic}</h3>
            <p id="topic-desc">{name.desc}</p>
            <Link to={`/post/${topic}`}><p id="create-btn">Create New Thread</p></Link>
            {postsToShow.length > 0 ? <ThreadCards postsToShow={postsToShow}/> : <img src={loading} alt="loading" id="loading"/>}
            {postLength !== postsToShow.length && postLength > 6 ? <button onClick={handleShowMorePosts} id="show-more">Show More</button> : null}
        </div>
    )
    
}

export default Topic