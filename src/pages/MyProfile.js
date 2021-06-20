import { useEffect, useContext, useState } from "react"
import { useHistory } from "react-router"
import {GlobalCtx} from "../App"
import LogoutBtn from "../components/LogoutBtn"
import ThreadCards from "../components/ThreadCards"

const postsPerPage = 3;
let arrayForHoldingPosts = [];

const MyProfile = () => {

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

   const username = localStorage.getItem("user")

   const {gState} = useContext(GlobalCtx)
   const {url, token} = gState

   const [postsToShow, setPostsToShow] = useState([]);
   const [next, setNext] = useState(3);
   const [postLength, setPostLength] = useState(null)

   const loopWithSlice = (start, end, val) => {
       const slicedPosts = val.slice(start, end)
       arrayForHoldingPosts = [...arrayForHoldingPosts, ...slicedPosts];
       setPostsToShow(arrayForHoldingPosts);
     };

   const getUserPosts = (a, b) => {
      fetch(`${url}/posts/user/${username}`, {
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
      getUserPosts(0, postsPerPage)
   }, [])

   const handleShowMorePosts = () => {
      getUserPosts(next, next + postsPerPage);
      setNext(next + postsPerPage);
    };

 return (
    <>
    <div id="profile-flex">
    <h3>{username}</h3>
    <LogoutBtn />
    </div>
    <ThreadCards postsToShow={postsToShow}/>
    {postLength !== postsToShow.length && postLength > 3 ? <button onClick={handleShowMorePosts} id="show-more">Show More</button> : null}
    </>
 )
}

export default MyProfile