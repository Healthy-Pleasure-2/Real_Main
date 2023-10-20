<<<<<<< HEAD
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

=======
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import '../../Pages/styles/Calendar_custom.css'; // css import

function ReactCalendar() {
  const [value, onChange] = useState(new Date());

  return (
    <div id='calendar_container'>
      <Calendar
        onChange={onChange}
        value={value}
        minDetail='year'
        formatDay={(locale, date) => date.toLocaleString("en", { day: "numeric" })}
        showNeighboringMonth={false}
        minDate={new Date(2022, 1, 1)}
        maxDate={new Date(2033, 12, 31)}
      />
    </div>
  );
}

>>>>>>> 7bbbe6c4c0d561b562b3114b544d17e7862c796b
export default ReactCalendar; 