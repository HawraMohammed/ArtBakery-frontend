import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import './EditPost.css'
import postService from "../../services/postService";


function EditPost() {
    const initialState = { title: "", content: "", category: "Birthday" }
    const { postId } = useParams()
    const [formData, setFormData] = useState(initialState)
    const { title, content, category } = formData;
    const navigate = useNavigate()
    const [images, setSelectedFiles] = useState([]);
    const [newImages, setNewImages] = useState([]);
    const [deletePictures, setDeletePictures] = useState([]);




    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };


    useEffect(() => {
        async function getPost() {
            const post = await postService.getPost(postId);
            setFormData({ title: post.title, content: post.content, category: post.category });
            setSelectedFiles(post.images)
        }
        getPost();
    }, [])

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {

            const formData = new FormData();

            formData.append("title", title);
            formData.append("content", content);
            formData.append("category", category);
            deletePictures.forEach(publicId => {
                formData.append("deletePictures", publicId);
            });

            newImages.forEach(file => {
                formData.append("images", file);
            });

            await postService.updatePost(formData, postId)
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
    const handlePicturesChange = (e) => {
        const newFiles = Array.from(e.target.files);

        setNewImages((prevFiles) => [
            ...prevFiles,
            ...newFiles
        ]);
    };
    const handleRemoveImage = (image) => {
        setSelectedFiles(prevImages =>
            prevImages.filter(
                picture => picture.public_id !== image.public_id
            )
        );

        setDeletePictures(prev => [
            ...prev,
            image.public_id
        ]);
    };


    const handleRemoveNewImage = (index) => {
        setNewImages(prevFiles =>
            prevFiles.filter((_, i) => i !== index)
        );
    };
    return (
        <main>
            <div className="auth-page">
                <div className="auth-card">
                    <div className="auth-logo">Edit Post</div>

                    <h1>Edit Post 🍪</h1>
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
                                <option value="Other">Others</option>
                            </select>
                        </div>


                        <div className="mb-3">

                            <label
                                htmlFor="images"
                                className="form-label"
                            >
                                Images
                            </label>

                            <input
                                type="file"
                                id="images"
                                name="images"
                                multiple
                                onChange={handlePicturesChange}
                                className="form-control auth-input"
                            />


                            <div className="edit-images-section">

                                <label>Current Images</label>

                                <div className="edit-images-grid">

                                    {images.map((image, index) => (

                                        <div
                                            className="edit-image-wrapper"
                                            key={
                                                image.public_id || index
                                            }
                                        >

                                            <img
                                                src={image.url}
                                                alt={`Post image ${index + 1}`}
                                                className="edit-post-image"
                                            />

                                            <button
                                                type="button"
                                                className="delete-image-button"
                                                onClick={() =>
                                                    handleRemoveImage(image)
                                                }
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>

                                        </div>

                                    ))}

                                </div>

                            </div>


                            {newImages.length > 0 && (

                                <div className="edit-images-section">

                                    <label>New Images</label>

                                    <div className="edit-images-grid">

                                        {newImages.map((file, index) => (

                                            <div
                                                className="edit-image-wrapper"
                                                key={index}
                                            >

                                                <img
                                                    src={URL.createObjectURL(file)}
                                                    alt={`New image ${index + 1}`}
                                                    className="edit-post-image"
                                                />

                                                <button
                                                    type="button"
                                                    className="delete-image-button"
                                                    onClick={() =>
                                                        handleRemoveNewImage(index)
                                                    }
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>

                                            </div>

                                        ))}

                                    </div>

                                </div>

                            )}

                        </div>

                        <div className="auth-buttons">
                            <button className="auth-button" disabled={isFormInvalid()}>Edit Post</button>
                            <button type="button" className="auth-cancel" onClick={() => navigate('/posts')}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )

}
export default EditPost