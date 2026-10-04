import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import './RequestCard.css'

function RequestCard({ request, handleDeleteReq }) {
    const { user } = useContext(UserContext)
    return (
        <div className="request-card">
            <div className="request-card-header">
                <span className="request-category">
                    {request.category}
                </span>

            </div>

            <h3>{request.title}</h3>

            <p className="request-description">
                {request.description}
            </p>

            <div className="request-details">
                <div>
                    <strong>Requested date</strong>
                    <span>
                        {new Date(request.requestedDate).toLocaleDateString()}
                    </span>
                </div>
                {user.role == "admin" && (<div>
                    <strong>Customer</strong>
                    <span>{request.requestor?.username}</span>
                </div>)}

            </div>

            <div className="request-actions">
                {user.role == "admin" && (
                    <button className="accept-button">
                        Accept
                    </button>)}

                <button className="reject-button"
                    onClick={() => handleDeleteReq(request._id)}>
                    {user.role == "admin" ? 'Reject' : 'Withdraw'}
                </button>
            </div>
        </div>
    );
}


export default RequestCard