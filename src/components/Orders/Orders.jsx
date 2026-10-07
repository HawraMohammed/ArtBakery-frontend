import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import './Orders.css'
import orderServices from "../../services/orderServices";
import OrderCard from "./OrderCard/OrderCard";
import EditOrder from "../EditOrder/EditOrder";

function Orders() {
    const { user } = useContext(UserContext)
    const [AllOrders, setAllOrders] = useState([])
    const [showOrder, setShow] = useState(null);
    const [editOrder, setEditOrder] = useState(null);
    const [message, setMessage] = useState(null);




    useEffect(() => {
        const getAllOrders = async () => {
            try {
                const orders = await orderServices.getAllOrders();
                setAllOrders(orders)
            }
            catch (err) { console.log(err.message) }
        }
        if (user) getAllOrders()
    }, [user])

    const handleDeleteOrder = async (orderId) => {
        try {
            await orderServices.deleteOrder(orderId);
            setAllOrders(AllOrders.filter((order) => order._id !== orderId))
        }
        catch (err) { console.log(err.message) }
    }

    const handleUpdateOrder = (updatedOrder) => {
        setAllOrders(prev =>
            prev.map(order =>
                order._id === updatedOrder._id
                    ? updatedOrder
                    : order
            )
        );

        setEditOrder(null);
    };

    const handlePayment = async (orderId) => {
        try {
            const data = await orderServices.createPayment(orderId)

            window.location.href = data.paymentUrl;
        } catch (err) {
            console.log(err);
        }
    };

    const checkPaymentResult = async (orderId, tapId) => {
        try {
            const updatedOrder = await orderServices.checkPayment(orderId, tapId)

            if (updatedOrder.paymentStatus === "paid") {
                setMessage("Payment successful!");
            } else {
                setMessage("Payment failed.");
            }
            handleUpdateOrder(updatedOrder)

            setTimeout(() => {
                setMessage(null);
            }, 3000);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const orderId = params.get("orderId");
        const tapId = params.get("tap_id");


        if (orderId && tapId) {
            checkPaymentResult(orderId, tapId);
        }
    }, []);

    return (<>
        {message && (<div className="payment-message">
            <i
                className={`bi ${message === "Payment successful!"
                    ? "bi-check-circle-fill success-icon"
                    : "bi-x-circle-fill failed-icon"
                    }`}
            ></i>

            <span>{message}</span>
        </div>)}
        {showOrder && (
            <div className="form-overlay single-request">
                <OrderCard
                    order={showOrder}
                    handleDeleteOrder={() => { setShow(null); handleDeleteOrder(showOrder._id) }}
                    handlePayment={() => { setShow(null); handlePayment(showOrder._id) }}

                    onEdit={() => {
                        setShow(null);
                        setEditOrder(showOrder);
                    }}
                    onCancel={() => setShow(null)}
                />
            </div>
        )}
        {editOrder && (
            <div className="form-overlay">
                <EditOrder editOrder={editOrder}
                    onCancel={() => setEditOrder(null)}
                    handleUpdateOrder={handleUpdateOrder} /></div>)}

        <h2 className="orders-title">All Orders</h2>
        <div className="request-cards">
            {AllOrders?.map((order, index) => {
                return <OrderCard key={index} order={order}
                    handleDeleteOrder={() => handleDeleteOrder(order._id)}
                    handlePayment={() => handlePayment(order._id)}

                    onEdit={() => {
                        setEditOrder(order)
                    }}
                    onShow={() => setShow(order)}
                />
            })
            }</div>
    </>)
}
export default Orders