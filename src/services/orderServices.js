const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/orders`;

const getAllOrders = async () => {
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

const getCalendarOrders = async (startDate, endDate) => {
    try {
        const res = await fetch(`${BASE_URL}?calendar=true&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`,
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

const updateOrderPayment = async (orderData, orderId) => {
    try {
        const res = await fetch(`${BASE_URL}/${orderId}`,
            {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify(orderData),

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

const updateOrderAddress = async (orderData, orderId) => {
    try {
        const res = await fetch(`${BASE_URL}/${orderId}/address`,
            {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify(orderData),

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

const deleteOrder = async (requestId) => {
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
export default { getAllOrders, getCalendarOrders, updateOrderPayment, updateOrderAddress, deleteOrder }
