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

    return (<>
        {showOrder && (
            <div className="form-overlay single-request">
                <OrderCard
                    order={showOrder}
                    handleDeleteOrder={() => { setShow(null); handleDeleteOrder(showOrder._id) }}
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

        <h2>All Orders:</h2>
        <div className="request-cards">
            {AllOrders?.map((order, index) => {
                return <OrderCard key={index} order={order}
                    handleDeleteOrder={handleDeleteOrder}
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