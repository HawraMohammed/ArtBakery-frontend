import { useContext, useEffect, useState } from "react";
import requestService from "../../services/requestService"
import RequestCard from "./RequestCard/RequestCard";
import { UserContext } from "../../contexts/UserContext";
import './Requests.css'
import EditRequest from "../EditRequest/EditRequest";

function Requests() {
    const { user } = useContext(UserContext)
    const [Allrequests, setAllRequests] = useState([])

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


    return (<>
        <h2>All requests:</h2>
        <div className="request-cards">
            {Allrequests?.map((request, index) => {
                return <RequestCard key={index} request={request}
                    handleDeleteReq={handleDeleteReq}
                />
            })
            }</div>
    </>)
}
export default Requests