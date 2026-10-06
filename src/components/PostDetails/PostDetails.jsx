import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import postService from "../../services/postService";
import './PostDetails.css'

function PostDetials({ handleDeletePost }) {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [index, setIndex] = useState(0);


    useEffect(() => {
        async function getPost() {
            const post = await postService.getPost(postId);
            setPost(post);
        }
        getPost();
    }, [])

    const previous = () => {
        if (index <= 0)
            setIndex(post.images.length - 1)
        else setIndex(index - 1)
    }
    const next = () => {
        if (index >= post.images.length - 1)
            setIndex(0)
        else setIndex(index + 1)
    }


    if (!post) {
        return <p>Loading...</p>;
    }

    return (
        <div className="post-details-page">
            <p className="back-button" onClick={() => navigate(-1)}>
                <i className="bi bi-arrow-left"></i>
                Back
            </p>            <div className="post-details-card">
                <div className="post-details-image-container">

                    <img
                        src={post.images[index].url}
                        alt={post.title}
                        className="post-details-image"
                    />

                    {post.images.length > 1 && (
                        <>
                            <button
                                type="button"
                                className="image-arrow image-arrow-left"
                                onClick={previous}
                            >
                                <i className="bi bi-chevron-left"></i>
                            </button>

                            <button
                                type="button"
                                className="image-arrow image-arrow-right"
                                onClick={next}
                            >
                                <i className="bi bi-chevron-right"></i>
                            </button>
                        </>
                    )}

                </div>
                <div className="post-details-content">

                    <div className="post-details-top">
                        <span className="post-details-category">
                            {post.category}
                        </span>

                        <div className="post-details-actions">
                            <button
                                type="button"
                                onClick={() => navigate(`/posts/${postId}/edit`)}
                                className="post-edit-button"
                            >
                                <i className="bi bi-pencil"></i>
                            </button>

                            <button
                                type="button"
                                onClick={() => handleDeletePost(postId)}
                                className="post-delete-button"
                            >
                                <i className="bi bi-trash"></i>
                            </button>
                        </div>
                    </div>

                    <h1>{post.title}</h1>

                    <div className="post-details-meta">
                        <span>
                            <i className="bi bi-calendar3"></i>
                            {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                    </div>

                    <p className="post-details-text">
                        {post.content}
                    </p>

                </div>

            </div>

            <div className="comments-section">
                <h2>Comments</h2>

                {/* comments will go here */}

            </div>

        </div>
    )
}
export default PostDetials