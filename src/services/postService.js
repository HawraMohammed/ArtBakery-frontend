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

const getPost = async (postId) => {
    try {
        const res = await fetch(`${BASE_URL}/${postId}`,
            {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            }
        );
        if (!res.ok) {
            throw new Error(`Failed to fetch post: ${res.status}`);
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


const updatePost = async (postData, postId) => {
    try {

        const res = await fetch(`${BASE_URL}/${postId}`,
            {
                method: 'PUT',
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


const deletePost = async (postId) => {
    try {
        const res = await fetch(`${BASE_URL}/${postId}`,
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

const createComment = async (commentData, postId) => {
    try {
        const res = await fetch(`${BASE_URL}/${postId}/comments`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify(commentData),

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

const updateComment = async (commentData, postId, commentId) => {
    try {
        const res = await fetch(`${BASE_URL}/${postId}/comments/${commentId}`,
            {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify(commentData),

            }
        );

        if (!res.ok) {
            const err = await res.json()
            throw new Error(err.message || err);
        }

        return await res.json();
    }
    catch (err) {
        console.log(err)
    }
}

const deleteComment = async (postId, commentId) => {
    try {
        const res = await fetch(`${BASE_URL}/${postId}/comments/${commentId}`,
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
export default { getAllPosts, getPost, createPost, updatePost, deletePost, createComment, updateComment, deleteComment }