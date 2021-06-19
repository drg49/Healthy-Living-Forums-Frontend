const moment = require('moment')

const Comments = ({postsToShow}) => {
    return (
        <section>
            {postsToShow.map((item) => {
                return (
                    <div key={item.id} id="comment-box">
                        <div>
                            <h3>{item.author}</h3>
                            <p>{moment(item.created_at).format('l')}</p>
                        </div>
                        <p>{item.body}</p>
                    </div>
                )
            })}
        </section>
    )
}

export default Comments