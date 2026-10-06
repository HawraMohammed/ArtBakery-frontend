import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../contexts/UserContext"
import postService from "../../services/postService"
import { Link } from "react-router"
import PostCard from "./PostCard/PostCard"
import './Gallery.css'

function Gallery() {
    const [posts, setPosts] = useState([])
    const { user } = useContext(UserContext)
    useEffect(() => {
        const getAllPosts = async () => {
            try {
                const posts = await postService.getAllPosts()
                setPosts(posts)
            }
            catch (err) { console.log(err.message) }
        }
        if (user) getAllPosts()
    }, [user])


    return (<>
        <div className="posts-page">
            <div className="new-post-wrapper">
                <Link to="/posts/new" className="new-post-button">
                    <i className="bi bi-plus-lg"></i>
                    New Post
                </Link>  </div>
            <div className="posts-container">
                {posts.map((post) => {
                    return <PostCard post={post} key={post._id}
                        postImage={post.images[0]}
                    />
                })}</div>
        </div>
    </>)
}
export default Gallery