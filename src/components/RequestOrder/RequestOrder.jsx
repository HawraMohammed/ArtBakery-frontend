import { useState } from "react";
import Calender from "../Calender/Calendar";
import RequestForm from "../Calender/RequestForm/RequestForm";
import './RequestOrder.css'

function RequestOrder() {
    const [selectedDate, setSelectedDate] = useState(null);

    return (

        <div className="calendar-wrapper">

            <h2 className="requests-title">Choose a date</h2>
            <Calender onDateSelect={(date) => setSelectedDate(date)} />

            {selectedDate && (
                <div className="form-overlay">

                    <RequestForm requestedDate={selectedDate}
                        onCancel={() => setSelectedDate(null)} />

                </div>
            )}

        </div>

    );
}

export default RequestOrder;