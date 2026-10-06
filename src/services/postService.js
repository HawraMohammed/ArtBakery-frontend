const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/posts`;

const getAllPosts = async () => {
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

const getRequest = async (requestId) => {
    try {
        const res = await fetch(`${BASE_URL}/${requestId}`,
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
const createPost = async (postData) => {
    try {

        const res = await fetch(`${BASE_URL}`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },

                body: postData,

            }
        );

        if (!res.ok) {
            const error = await res.json()
            throw new Error(error.message || error);
        }

        return await res.json();
    }
    catch (error) {

        console.log(error)
    }
}

const updateRequest = async (requestData, requestId) => {
    try {
        const res = await fetch(`${BASE_URL}/${requestId}`,
            {
                method: 'PUT',
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

const acceptRequest = async (requestId, requestData) => {
    try {
        const res = await fetch(`${BASE_URL}/${requestId}/accept`,
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
export default { getAllPosts, createPost }