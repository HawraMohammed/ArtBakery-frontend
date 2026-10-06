import { useContext } from 'react';
import './CommentCard.css'
import { UserContext } from '../../../contexts/UserContext';
function CommentCard({ comment, onEdit, handleCommentDeleted }) {
    const { user } = useContext(UserContext)
    return (
        <div className="comment-card">
            <div className="comment-header">
                <div className="comment-avatar">
                    <i className="bi bi-person-fill"></i>
                </div>

                <div className="comment-user">
                    <h5>{comment.owner.username}</h5>
                    <span>
                        {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                </div>
                {comment?.owner.toString() === user?._id.toString() && (<><button
                    className="comment-edit-button"
                    onClick={() => onEdit(comment)}
                >
                    <i className="bi bi-pencil"></i>
                </button>
                    <button
                        className="comment-delete-button"
                        onClick={() => handleCommentDeleted(comment._id)}
                    >
                        <i className="bi bi-trash"></i>
                    </button>

                </>)}

            </div>
            <p className="comment-title">
                {comment.title}
            </p>
            <p className="comment-content">
                {comment.content}
            </p>
        </div>
    );


}
export default CommentCard