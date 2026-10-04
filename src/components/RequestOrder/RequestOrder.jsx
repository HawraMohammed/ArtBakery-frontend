import { useState } from "react";
import Calender from "../Calender/Calendar";

function RequestOrder() {
    const [selectedDate, setSelectedDate] = useState(null);
    return (<>
        <h3>choose a slot</h3>
        <Calender onDateSelect={(date) => setSelectedDate(date)} />
    </>
    );
}

export default RequestOrder;