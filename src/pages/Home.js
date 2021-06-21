import {Link} from 'react-router-dom'

const Home = () => {

    return (
        <div id="homepage">
            <h1>Healthy Living Forums</h1>
            <section id="banner">
                <div>
                <div id="home">
                    <div>
                    <p>You're not alone when it comes to your health.</p>
                    <section>
                        <Link to="/signup"><h2 id="signup">Signup</h2></Link>
                        <Link to="/login"><h2 id="login">Login</h2></Link>
                    </section>
                    </div>
                </div>
                </div>
            </section>
            <article>
                <h2 id="home-h2">Making the World a Healthier Place</h2>
                <p id="home-p">While browsing our forums, you will realize that every user's goal is to become healthier. The Healthy Living Forum is a close community where people can talk about their health with other individuals. There are plenty of discussion topics to choose from where you can start your own discussion, or simply join in on one. The Healthy Living Forums should not be a place to seek medical advice but instead acts as a place where individuals can support each other through their time of need.</p>
            </article>
        </div>
    )
}

export default Home