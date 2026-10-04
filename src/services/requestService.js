const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/requests`;

const getAllRequests = async () => {
    try {
        const res = await fetch(`${BASE_URL}`,
            {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            }
        );
        if (!res.ok) {
            throw new Error(`Failed to fetch requests: ${res.status}`);
        }
        return await res.json();
    }
    catch (err) {
        console.log(err)
    }
}
const createRequest = async (requestData) => {
    try {
        const res = await fetch(`${BASE_URL}`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify(requestData),

            }
        );

        if (!res.ok) {
            throw new Error(res.json());
        }

        return await res.json();
    }
    catch (err) {
        console.log(err)
    }
}

const deleteRequest = async (requestId) => {
    try {
        const res = await fetch(`${BASE_URL}/${requestId}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            }
        );
    }
    catch (err) {
        console.log(err)
    }
}
export default { getAllRequests, createRequest, deleteRequest }