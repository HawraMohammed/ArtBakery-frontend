import { useContext, useState } from "react";
import orderServices from "../../services/orderServices";
import { UserContext } from "../../contexts/UserContext";


function EditOrder({ editOrder, onCancel, handleUpdateOrder }) {
    const { user } = useContext(UserContext);
    const [formData, setFormData] = useState({
        price: editOrder.price ?? ""
        , paymentStatus: editOrder.paymentStatus,
        address: {
            building: editOrder.address?.building ?? "",
            block: editOrder.address?.block ?? "",
            road: editOrder.address?.road ?? "",
            area: editOrder.address?.area ?? "",
        }
    });
    const { price, paymentStatus, address } = formData;



    const handleChange = (evt) => {
        const { name, value } = evt.target;

        if (["building", "block", "road", "area"].includes(name)) {
            setFormData({
                ...formData,
                address: {
                    ...formData.address,
                    [name]: value
                }
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        let updatedOrder;
        try {
            if (user.role === 'admin') {
                updatedOrder = await orderServices.updateOrderPayment(formData, editOrder._id)
            }
            else {
                updatedOrder = await orderServices.updateOrderAddress(formData, editOrder._id)

            }
            handleUpdateOrder(updatedOrder)
        } catch (error) {
            console.log(error.message)
        }

    };

    const isFormInvalid = () => {
        return user.role === 'admin' ? !(paymentStatus && price) : !(address?.building && address?.block && address?.road && address?.area);
    };

    return (
        <main>
            <div className="auth-page">
                <div className="auth-card">
                    <div className="auth-logo">Edit Order</div>

                    <h1>Edit Order 🍪</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor='title' className="form-label">Title:{editOrder.title}</label>

                        </div>
                        <div className="mb-3">
                            <label htmlFor='description' className="form-label">Description:{editOrder.description}</label>
                        </div>
                        <div className="mb-3">
                            <label htmlFor='category' className="form-label">Category:{editOrder.category}</label>

                        </div>
                        <div className="mb-3">
                            <label htmlFor='confirm' className="form-label">Requested Date: {new Date(editOrder.requestedDate).toLocaleDateString()}</label>

                        </div>

                        <div className="mb-3">
                            <label htmlFor='confirm' className="form-label">Price:{user?.role !== 'admin' ? editOrder.paymentStatus : ''}</label>
                            {user?.role === 'admin' && (<input
                                type='text'
                                id='price'
                                value={price}
                                name='price'
                                onChange={handleChange}
                                required
                                className="form-control auth-input"
                            />)}
                        </div>
                        <div className="mb-3">
                            <label htmlFor='confirm' className="form-label">Payment Status: {editOrder.paymentStatus}</label>

                        </div>

                        <div className="mb-3">
                            <label htmlFor='confirm' className="form-label">Address info:</label>
                            <label htmlFor='confirm' className="form-label">Building:{user.role === 'admin' ? editOrder.address?.building ?? 'Not set yet' : ''}</label>
                            {user?.role !== 'admin' && user._id == editOrder.user._id && (<input
                                type='text'
                                id='building'
                                value={address?.building}
                                name='building'
                                onChange={handleChange}
                                required
                                className="form-control auth-input"
                            />)}s
                            <label htmlFor='confirm' className="form-label">Block:{user.role === 'admin' ? editOrder.address?.block ?? 'Not set yet' : ""}</label>
                            {user?.role !== 'admin' && user?._id === editOrder.user._id && (<input
                                type='text'
                                id='block'
                                value={address?.block}
                                name='block'
                                onChange={handleChange}
                                required
                                className="form-control auth-input"
                            />)}
                            <label htmlFor='confirm' className="form-label">road:{user.role === 'admin' ? editOrder.address?.road ?? 'Not set yet' : ''}</label>
                            {user?.role !== 'admin' && user._id == editOrder.user._id && (<input
                                type='text'
                                id='road'
                                value={address?.road}
                                name='road'
                                onChange={handleChange}
                                required
                                className="form-control auth-input"
                            />)}

                            <label htmlFor='confirm' className="form-label">area:{user.role === 'admin' ? editOrder.address?.area ?? 'Not set yet' : ''}</label>
                            {user?.role !== 'admin' && user._id == editOrder.user._id && (<input
                                type='text'
                                id='area'
                                value={address?.area}
                                name='area'
                                onChange={handleChange}
                                required
                                className="form-control auth-input"
                            />)}
                        </div>
                        <div className="auth-buttons">
                            <button className="auth-button" disabled={isFormInvalid()}>Edit Order</button>
                            <button type="button" className="auth-cancel" onClick={onCancel}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}
export default EditOrder