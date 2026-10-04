import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import requestService from "../../services/requestService";


function EditRequest() {
    const { requestId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        requestedDate: "",
    });
    const { title, description, category, requestedDate } = formData;


    useEffect(() => {
        async function getRequest() {
            const data = await requestService.getRequest(requestId);
            setFormData(data)
        }
        getRequest();
    }, [requestId]);

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            await requestService.updateRequest(formData, requestId)
            navigate('/requests')
        } catch (error) {
            console.log(error.message)
        }

    };

    const isFormInvalid = () => {
        return !(title && description);
    };

    return (
        <main>
            <div className="auth-page">
                <div className="auth-card">
                    <div className="auth-logo">Edit Request</div>

                    <h1>Edit Request 🍪</h1>
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
                            <label htmlFor='description' className="form-label">Description:</label>
                            <input
                                type='description'
                                id='description'
                                value={description}
                                name='description'
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
                            <label htmlFor='confirm' className="form-label">Requested Date: {new Date(requestedDate).toLocaleDateString()}</label>


                        </div>
                        <div className="auth-buttons">
                            <button className="auth-button" disabled={isFormInvalid()}>Request</button>
                            <button className="auth-cancel" onClick={() => navigate('/requests')}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}
export default EditRequest