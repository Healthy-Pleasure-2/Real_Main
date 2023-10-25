import React, { useState } from 'react';
import Calendar from 'react-calendar';
import '../../Pages/styles/Calendar_custom.css'; // css import

function ReactCalendar() {
  const [selectedDate, onChange] = useState(new Date());
  const selectedYear = selectedDate.getFullYear();
  const selectedMonth = selectedDate.getMonth();
  const selectedday = selectedDate.getDay();
  return (
    <div id='calendar_container'>
      <Calendar
        onChange={onChange}
        value={selectedDate}
        minDetail='year'
        formatDay={(locale, date) => date.toLocaleString("en", { day: "numeric" })}
        showNeighboringMonth={false}
        minDate={new Date(2021, 12, 31)}
        maxDate={new Date(2033, 11, 31)}
      />
      {console.log(selectedDate)}
      {console.log(selectedYear)}
      {console.log(selectedMonth)}
      {console.log(selectedday)}
    </div>
  );
}

export default ReactCalendar; 