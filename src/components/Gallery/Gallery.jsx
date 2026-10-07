import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../contexts/UserContext"
import postService from "../../services/postService"
import { Link } from "react-router"
import PostCard from "./PostCard/PostCard"
import './Gallery.css'
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner"

function Gallery() {
    const [posts, setPosts] = useState(null)
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
        getAllPosts()
    }, [])
    const filteredPosts =
        selectedCategory === "All"
            ? posts
            : posts.filter(post => post.category === selectedCategory);


    if (!posts) {
        return <LoadingSpinner />
    }

    return (<>
        <div className="posts-page">
            {user?.role === 'admin' && (<div className="new-post-wrapper">
                <Link to="/posts/new" className="new-post-button">
                    <i className="bi bi-plus-lg"></i>
                    New Post
                </Link>  </div>)}
            {posts.length > 0 ?
                (<><div className="category-filter">
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
                        })}</div></>)
                : (<div className="no-posts-card">
                    <i className="bi bi-images no-posts-icon"></i>
                    <h3>No Posts Yet</h3>
                    <p>There are no posts to show right now. Check back soon for more!</p>
                </div>)
            }
        </div>
    </>)
}
export default Gallery