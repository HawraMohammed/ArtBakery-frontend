import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import postService from "../../services/postService";
import './PostDetails.css'
import { UserContext } from "../../contexts/UserContext";
import CommentCard from "./CommentCard/CommentCard";
import CommentForm from "./CommentForm/CommentForm";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

function PostDetials({ handleDeletePost }) {
    const { user } = useContext(UserContext)
    const { postId } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [index, setIndex] = useState(0);
    const [comments, setComments] = useState([]);
    const [editingComment, setEditingComment] = useState(null);

    useEffect(() => {
        async function getPost() {
            const post = await postService.getPost(postId);
            setPost(post);
            setComments(post.comments)
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

    const handleCommentCreated = (newComment) => {
        setComments(prevComments => [
            ...prevComments,
            newComment
        ]);
    };

    const handleCommentUpdated = (updatedComment) => {
        setComments(prevComments =>
            prevComments.map(comment =>
                comment._id === updatedComment._id
                    ? updatedComment
                    : comment
            )
        );

        setEditingComment(null);
    };

    const handleCommentDeleted = async (commentId) => {
        try {
            await postService.deleteComment(postId, commentId);

            setComments(prevComments =>
                prevComments.filter(comment => comment._id !== commentId)
            );
        } catch (err) {
            console.log(err);
        }
    };
    if (!post) {
        return <LoadingSpinner />

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
                        {user?.role === "admin" && (
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
                            </div>)}
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
                {user &&
                    (editingComment ? (
                        <CommentForm
                            comment={editingComment}
                            handleCommentUpdated={handleCommentUpdated}
                            onCancel={() => setEditingComment(null)}
                        />
                    )
                        :
                        (<CommentForm handleCommentCreated={handleCommentCreated} />)

                    )}
                {comments?.map((comment) => {
                    return <CommentCard comment={comment} key={comment._id}
                        onEdit={setEditingComment}
                        handleCommentDeleted={handleCommentDeleted}

                    />
                })}

            </div>

        </div>
    )
}
export default PostDetials