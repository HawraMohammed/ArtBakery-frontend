import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../contexts/UserContext"
import postService from "../../services/postService"
import { Link } from "react-router"
import PostCard from "./PostCard/PostCard"
import './Gallery.css'

function Gallery() {
    const [posts, setPosts] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("All")

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
    const filteredPosts =
        selectedCategory === "All"
            ? posts
            : posts.filter(post => post.category === selectedCategory);

    return (<>
        <div className="posts-page">
            <div className="new-post-wrapper">
                <Link to="/posts/new" className="new-post-button">
                    <i className="bi bi-plus-lg"></i>
                    New Post
                </Link>  </div>

            <div className="category-filter">
                <label htmlFor="category">Filter by category:</label>

                <select
                    id="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="All">All</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Baby">Baby</option>
                    <option value="Graduation">Graduation</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Gift">Gift</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Religious">Religious</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div className="posts-container">
                {filteredPosts.map((post) => {
                    return <PostCard post={post} key={post._id}
                        postImage={post.images[0]}
                    />
                })}</div>
        </div>
    </>)
}
export default Gallery