import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./Calendar.css";
import { useContext, useRef, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import orderServices from "../../services/orderServices";

function Calender({ onDateSelect }) {
    const { user } = useContext(UserContext)
    const [weekOrders, setWeekOrders] = useState({});
    const fetchedRange = useRef(null);
    const [message, setMessage] = useState(null);


    const getWeekStart = (date) => {
        const d = new Date(date);
        const day = d.getDay();

        d.setDate(d.getDate() - day);
        d.setHours(0, 0, 0, 0);

        return d;
    };
    function getWeekKey(date) {
        return getWeekStart(date).toISOString().split("T")[0];
    }
    function matchOrdersByWeek(orders) {
        const grouped = {}

        orders.forEach((order) => {
            const key = getWeekKey(order.requestedDate)
            if (!grouped[key])
                grouped[key] = []
            grouped[key].push(order);
        })
        return grouped
    }

    function getWeekStatus(date) {
        const key = getWeekKey(date);
        const week = weekOrders[key] || []
        if (week.length >= 2) {
            return "full"
        }
        const userHasAnOrder = week.some((order) => {
            return order.user?.toString() === user?.toString()
        })
        if (userHasAnOrder) return "has-order"
        return "available"
    }



    const fetchOrders = async (info) => {
        const start = info.start.toISOString();
        const end = info.end.toISOString();
        if (
            fetchedRange.current?.start === start &&
            fetchedRange.current?.end === end
        ) {
            return;
        }

        fetchedRange.current = { start, end };
        try {
            const fetchedOrders = await orderServices.getCalendarOrders(info.start, info.end)
            setWeekOrders(matchOrdersByWeek(fetchedOrders))
        }
        catch (err) { console.log(err.message) }
    }

    return (
        <div className="calendar-container">
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                validRange={{ start: new Date() }}
                headerToolbar={{
                    left: "prev",
                    center: "title",
                    right: "next",
                }}
                datesSet={fetchOrders}

                dayCellClassNames={(info) => {
                    const status = getWeekStatus(info.date);

                    if (status === "full" || status === "has-order") {
                        return ["disabled-week"];
                    }

                    return [];
                }}

                dateClick={(info) => {
                    const status = getWeekStatus(info.date);

                    if (status === "full" || status === "has-order") {
                        setMessage(
                            status === "full"
                                ? "This week is fully booked."
                                : "You already have an order this week."
                        );

                        setTimeout(() => {
                            setMessage(null);
                        }, 3000);

                        return;
                    }

                    onDateSelect(info.date);
                }}
                showNonCurrentDates={false}
                fixedWeekCount={false}
            />
            {message && (
                <div className="request-message">
                    <i
                        className={
                            "bi-x-circle-fill failed-icon"}
                    ></i>

                    <span>{message}</span>
                </div>
            )}
        </div>)
}
export default Calender