import ArticleData from './ArticleData.json'

const ArticleSection = () => {

    const openSite = (link) => {
        window.open(link)
    }

    const article = ArticleData.map((item, index) => {
        return (
            <div id="article-flex" onClick={()=> openSite(item.link)}>
                <img src={item.img} alt={`Health article from ${item.site}`}/>
                <div id="article-info">
                    <h4>{item.title}</h4>
                    <p>{item.site}</p>
                </div>
            </div>
        )
    })

    return (
        <section id="articles">
            <h2>Articles of the Week</h2>
            <div id="article-card">
                {article}
            </div>
        </section>
    )
}

export default ArticleSection