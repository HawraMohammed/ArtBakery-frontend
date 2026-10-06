import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import './OrderCard.css'

function OrderCard({ order, handleDeleteOrder, handlePayment, onEdit, onShow, onCancel }) {
    const { user } = useContext(UserContext)
    return (
        <div className="request-card" onClick={onShow}>
            <div className="request-card-header">
                <div className="card-buttons">
                    <button onClick={(e) => { e.stopPropagation(); onEdit() }}
                        className="edit-button">
                        <i className="bi bi-pencil"></i>
                    </button>
                    {onCancel && (<button onClick={onCancel}
                        className="cancel-button">
                        <i className="bi bi-x-lg"></i>
                    </button>)}
                </div>
                <span className="request-category">
                    {order.category}
                </span>

            </div>

            <h3>{order.title}</h3>
            {!onShow && <p>{order.description}</p>}
            <div className="request-details">
                <div>
                    <strong>Requested date</strong>
                    <span>
                        {new Date(order.requestedDate).toLocaleDateString()}
                    </span>
                    <strong>Price:</strong>
                    <span>
                        {order.price ?? "Price will be determined after negotiation"}
                    </span>
                    <strong>Payment Status:</strong>
                    <span>
                        {order.paymentStatus}
                    </span>
                    <strong>Address:</strong>
                    <span>
                        <strong>Building:</strong> {order.address?.building ?? "No address is added yet!!"}
                        <strong>Block:</strong> {order.address?.block ?? "No address is added yet!!"}<br />
                        <strong>Road:</strong> {order.address?.road ?? "No address is added yet!!"}
                        <strong>Area:</strong> {order.address?.area ?? "No address is added yet!!"}
                    </span>
                </div>
                {user.role === "admin" && (<div>
                    <strong>Customer</strong>
                    <span>{order.user.username}</span>
                </div>)}

            </div>

            <div className="request-actions">
                {user.role !== "admin" && order.paymentStatus === 'unpaid' && (
                    <button className="accept-button"
                        onClick={(e) => { e.stopPropagation(); handlePayment() }}
                        disabled={order.price === null}
                    >
                        Pay Now
                    </button>)}
                <button className="reject-button"
                    onClick={(e) => { e.stopPropagation(); handleDeleteOrder() }}>
                    Delete order
                </button>
            </div>
        </div>
    );
}


export default OrderCard