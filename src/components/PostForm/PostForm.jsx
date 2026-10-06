import { useState } from "react";
import postService from "../../services/postService";
import { useNavigate } from "react-router";


function PostForm() {
    const initialState = { title: "", content: "", category: "Birthday" }
    const [formData, setFormData] = useState(initialState);
    const { title, content, category } = formData;

    const [images, setSelectedFiles] = useState([]);
    const navigate = useNavigate();

    const handlePicturesChange = (e) => {
        const newFiles = Array.from(e.target.files);

        setSelectedFiles((prevFiles) => [
            ...prevFiles,
            ...newFiles
        ]);
    };


    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {

            const formData = new FormData();

            formData.append("title", title);
            formData.append("content", content);
            formData.append("category", category);

            images.forEach((image) => {
                formData.append("images", image);
            });


            await postService.createPost(formData);
            setFormData(initialState)
            setSelectedFiles([])
            navigate('/posts');

        } catch (error) {
            console.log(error.message)
        }

    };

    const isFormInvalid = () => {
        return !(title && content && images.length > 0);
    };

    return (
        <main>
            <div className="auth-page">
                <div className="auth-card">
                    <div className="auth-logo">Create Post</div>

                    <h1>Create Post 🍪</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor='title' className="form-label">Title:</label>
                            <input
                                type='text'
                                id='title'
                                value={title}
                                name='title'
                                onChange={handleChange}
                                required
                                className="form-control auth-input"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor='content' className="form-label">Content:</label>
                            <textarea
                                type='content'
                                id='content'
                                value={content}
                                name='content'
                                onChange={handleChange}
                                required
                                className="form-control auth-input"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor='category' className="form-label">Category:</label>
                            <select type='category' name="category" id='category' value={category} onChange={handleChange} className="form-control auth-input">
                                <option value="Birthday">BirthDay</option>
                                <option value="Baby">Baby</option>
                                <option value="Graduation">Graduation</option>
                                <option value="Wedding">Wedding</option>
                                <option value="Gift">Gift</option>
                                <option value="Corporate">Corporate</option>
                                <option value="Religious">Religious</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor='confirm' className="form-label">Images</label>
                            <input
                                type="file"
                                id='images'
                                name='images'
                                onChange={handlePicturesChange}
                                required
                                className="form-control auth-input"
                            />

                        </div>
                        <div className="auth-buttons">
                            <button className="auth-button" disabled={isFormInvalid()}>Edit Request</button>
                            <button type="button" className="auth-cancel" onClick={() => navigate('/posts')}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}
export default PostForm