import React, { useState } from 'react';
import Calendar from 'react-calendar';
import '../../Pages/styles/Calendar_custom.css'; // css import

function ReactCalendar() {
  const [value, onChange] = useState(new Date());

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={value}
        minDetail='year'
        formatDay={(locale, date) => date.toLocaleString("en", { day: "numeric" })}
      />
    </div>
  );
}

export default ReactCalendar; 