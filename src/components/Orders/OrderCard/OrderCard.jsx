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
                </div>
                {user.role === "admin" && (<div>
                    <strong>Customer</strong>
                    <span>{order.user.username}</span>
                </div>)}
                <div className="order-info">

                    <strong>Price:</strong>
                    <span>
                        {order.price + " BHD" ?? "Price will be determined after negotiation"}
                    </span>
                    <strong>Payment Status:</strong>
                    <span>
                        {order.paymentStatus === 'paid' ? <i className="bi bi-check-circle-fill payment-paid"></i> : <i className="payment-unpaid bi bi-clock-fill"></i>}{order.paymentStatus}
                    </span></div>
                <div className="order-address">
                    <strong className="address-title">Address</strong>

                    <div className="address-details">
                        <div>
                            <strong>Building</strong>
                            <span>{order.address?.building ?? "Not added yet"}</span>
                        </div>

                        <div>
                            <strong>Block</strong>
                            <span>{order.address?.block ?? "Not added yet"}</span>
                        </div>

                        <div>
                            <strong>Road</strong>
                            <span>{order.address?.road ?? "Not added yet"}</span>
                        </div>

                        <div>
                            <strong>Area</strong>
                            <span>{order.address?.area ?? "Not added yet"}</span>
                        </div>
                    </div>
                </div>


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