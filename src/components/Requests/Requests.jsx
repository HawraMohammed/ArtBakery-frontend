import { useContext, useEffect, useState } from "react";
import requestService from "../../services/requestService"
import RequestCard from "./RequestCard/RequestCard";
import { UserContext } from "../../contexts/UserContext";
import './Requests.css'
import EditRequest from "../EditRequest/EditRequest";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

function Requests() {
    const { user } = useContext(UserContext)
    const [Allrequests, setAllRequests] = useState(null)
    const [editReq, setEditReq] = useState(null)
    const [showReq, setShow] = useState(null);


    useEffect(() => {
        const getAllRequests = async () => {
            try {
                const requests = await requestService.getAllRequests()
                setAllRequests(requests)
            }
            catch (err) { console.log(err.message) }
        }
        if (user) getAllRequests()
    }, [user])

    const handleDeleteReq = async (requestId) => {
        try {
            await requestService.deleteRequest(requestId);
            setAllRequests(Allrequests.filter((request) => request._id !== requestId))
        }
        catch (err) { console.log(err.message) }
    }

    const handleAcceptReq = async (requestId, requestData) => {
        try {
            await requestService.acceptRequest(requestId, requestData);
            setAllRequests(Allrequests.filter((request) => request._id !== requestId))

        }
        catch (err) { console.log(err.message) }
    }

    const handleUpdateRequest = (updatedRequest) => {
        setAllRequests(prev =>
            prev.map(request =>
                request._id === updatedRequest._id
                    ? updatedRequest
                    : request
            )
        );

        setEditReq(null);
    };

    if (!Allrequests) {
        return <LoadingSpinner />
    }
    if (Allrequests.length === 0)
        return (<div className="no-posts-card">
            <i className="bi bi-images no-posts-icon"></i>
            <h3>No requests yet</h3>
            <p>There are no requests to show right now. Check back soon for more!</p>
        </div>)
    return (<>
        {showReq && (
            <div className="form-overlay single-request">
                <RequestCard
                    request={showReq}
                    handleDeleteReq={() => { setShow(null); handleDeleteReq(showReq._id) }}
                    handleAcceptReq={() => { setShow(null); handleAcceptReq(showReq._id, showReq) }}

                    onEdit={() => {
                        setShow(null);
                        setEditReq(showReq);
                    }}
                    onCancel={() => setShow(null)}
                />
            </div>
        )}
        {editReq && (
            <div className="form-overlay">
                <EditRequest editReq={editReq}
                    onCancel={() => setEditReq(null)}
                    handleUpdateRequest={handleUpdateRequest} /></div>)}

        <h2 className="requests-title">All requests</h2>
        <div className="request-cards">
            {Allrequests?.map((request, index) => {
                return <RequestCard key={index} request={request}
                    handleDeleteReq={handleDeleteReq}
                    handleAcceptReq={handleAcceptReq}
                    onEdit={() => setEditReq(request)}
                    onShow={() => setShow(request)}
                />
            })
            }</div>
    </>)
}
export default Requests