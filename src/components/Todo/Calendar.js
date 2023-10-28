import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import '../../Pages/styles/Calendar_custom.css'; // css import

function ReactCalendar() {
  const [value, onChange] = useState(new Date());
  const [screenMinSize, setScreenMinSize] = useState(window.matchMedia("(max-width: 1200px)").matches)
  console.log(screenMinSize)

  useEffect(() => {
    // 화면 크기 변경 이벤트 리스너 등록
    const mediaQuery = window.matchMedia("(max-width: 1200px)");
    const handleResize = () => {
      setScreenMinSize(mediaQuery.matches);
    };

    mediaQuery.addListener(handleResize); // 리스너 추가
    handleResize(); // 초기 값 설정

    return () => {
      mediaQuery.removeListener(handleResize); // 컴포넌트 언마운트 시 리스너 제거
    }
  }, []);

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
          const dayOfWeek = date.getDay();
          if (screenMinSize) {
            // 요일을 한글로 변환합니다.
            const daysOfWeekKor = ['일', '월', '화', '수', '목', '금', '토'];
            return daysOfWeekKor[dayOfWeek];
          } else {
            // 요일을 영어로 변환합니다.
            const daysOfWeekEng = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            return daysOfWeekEng[dayOfWeek];
          }
        }}
      />
    </div>
  );
}

export default ReactCalendar; 