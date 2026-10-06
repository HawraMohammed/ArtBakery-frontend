import { useNavigate } from 'react-router';
import './PostCard.css'
function PostCard({ post, postImage }) {
    const navigate = useNavigate();
    return (
        <div className="post-card"
            onClick={() => navigate(`/posts/${post._id}`)}>
            <div className="post-image-container">
                <img
                    src={postImage.url}
                    alt={post.title}
                    className="post-image"
                />
            </div>

            <div className="post-card-body">
                <span className="post-category">
                    {post.category}
                </span>

                <h3 className="post-title">
                    {post.title}
                </h3>
            </div>
        </div>
    );

}
export default PostCard