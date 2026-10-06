import { useEffect, useState } from "react";
import postService from "../../../services/postService";
import { useParams } from "react-router";
import "./CommentForm.css"

function CommentForm({ comment, handleCommentCreated, handleCommentUpdated, onCancel }) {
    const { postId } = useParams()
    const [formData, setFormData] = useState({ title: "", content: "" })
    const { title, content } = formData


    useEffect(() => {
        if (comment) {
            setFormData({
                title: comment.title,
                content: comment.content
            });
        }
    }, [comment]);
    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {

            if (comment) {
                const updatedComment = await postService.updateComment(formData, postId, comment._id)
                handleCommentUpdated(updatedComment)
            }
            else {
                const newComment = await postService.createComment(formData, postId)
                handleCommentCreated(newComment)
            }

            setFormData({ title: "", content: "" })

        } catch (error) {
            console.log(error.message)
        }

    };

    const isFormInvalid = () => {
        return !(title && content);
    };

    return (
        <form className="comment-form" onSubmit={handleSubmit}>

            <h3>
                {comment ? "Edit Comment" : "Leave a Comment"}
            </h3>

            <div className="comment-form-group">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Give your comment a title"
                    required
                />
            </div>

            <div className="comment-form-group">
                <label htmlFor="content">Comment</label>
                <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="Write your comment..."
                    rows="4"
                    required
                />
            </div>
            <div className="comment-form-actions">
                <button type="submit" className="comment-submit-button"
                    disabled={isFormInvalid()}>
                    <i className="bi bi-chat-heart"></i>
                    {comment ? "Edit Comment" : "Post Comment"}
                </button>
                {comment && (
                    <button
                        type="button"
                        className="comment-cancel-button"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                )}</div>
        </form>
    );
}



export default CommentForm