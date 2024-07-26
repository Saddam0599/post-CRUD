import { Link } from 'react-router-dom';

const Home = ({ posts }) => {
    return (
        <main className="Home">
            {posts.length ? (
                posts.map(post => (
                    <article className="post" key={post.id}>
                        <Link to={`/post/${post.id}`}>
                            <h2>{post.title}</h2>
                            <p className="postDate">Created: {post.datetime}</p>
                            {post.updated && <p className="postDate">Updated: {post.updated}</p>}
                        </Link>
                        <p className="postBody">
                            {(post.body).length <= 25
                                ? post.body
                                : `${(post.body).slice(0, 25)}...`}
                        </p>
                    </article>
                ))
            ) : (
                <p style={{ marginTop: "2rem" }}>
                    No posts to display.
                </p>
            )}
        </main>
    )
}

export default Home;








