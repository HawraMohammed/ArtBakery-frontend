import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import './RequestCard.css'

function RequestCard({ request, handleDeleteReq, onEdit, onShow, onCancel, handleAcceptReq }) {
    const { user } = useContext(UserContext)
    return (
        <div className="request-card" onClick={onShow}>
            <div className="request-card-header">
                <div className="card-buttons">
                    {user?.role !== "admin" && (<button type="button" onClick={(e) => { e.stopPropagation(); onEdit() }}
                        className="edit-button">
                        <i className="bi bi-pencil"></i>
                    </button>)}
                    {onCancel && (<button onClick={onCancel}
                        className="cancel-button">
                        <i className="bi bi-x-lg"></i>
                    </button>)}
                </div>
                <span className="request-category">
                    {request.category}
                </span>

            </div>

            <h3>{request.title}</h3>
            {!onShow && <p>{request.description}</p>}
            <div className="request-details">
                <div>
                    <strong>Requested date</strong>
                    <span>
                        {new Date(request.requestedDate).toLocaleDateString()}
                    </span>
                </div>
                {user?.role == "admin" && (<div>
                    <strong>Customer</strong>
                    <span>{request.requestor?.username}</span>
                </div>)}

            </div>

            <div className="request-actions">
                {user?.role == "admin" && (
                    <button className="accept-button"
                        onClick={(e) => { e.stopPropagation(); handleAcceptReq(request._id, request) }}>
                        Accept
                    </button>)}

                <button className="reject-button"
                    onClick={(e) => { e.stopPropagation(); handleDeleteReq(request._id) }}>
                    {user?.role == "admin" ? 'Reject' : 'Withdraw'}
                </button>
            </div>
        </div>
    );
}


export default RequestCard