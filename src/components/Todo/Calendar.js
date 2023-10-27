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
        minDate={new Date(2021, 12, 31)}
        maxDate={new Date(2033, 11, 31)}
        formatShortWeekday={(locale, date) => {
          // date 객체의 getDay 메서드를 사용하여 해당 날짜의 요일을 가져옵니다.
          const dayOfWeek = date.getDay();

          // 요일을 영어로 변환합니다.
          const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
          return daysOfWeek[dayOfWeek];
        }}
      />
    </div>
  );
}

export default ReactCalendar; 