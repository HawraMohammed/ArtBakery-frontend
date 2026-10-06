import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../contexts/UserContext"
import postService from "../../services/postService"
import { Link } from "react-router"

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
        <Link to="/posts/new">New Post</Link>
    </>)
}
export default Gallery