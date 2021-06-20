import { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import topicdata from '../components/TopicData.json'
import ArticleSection from '../components/ArticleSection'

const Dashboard = () => {

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

    const links = topicdata.map((topic, index) => {
        return (
          <div id="topic-card">
            <Link to={topic.path} key={index}><p id="topic-link">{topic.name}</p></Link>
          </div>
        )
    })

    return (
    <>
        <h2 id="dash-title">Threads</h2>
        <section id="topics">
            {links}
        </section>
        <ArticleSection />
    </>
    )
}

export default Dashboard