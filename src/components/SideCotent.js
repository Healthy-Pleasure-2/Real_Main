import React, { useState } from "react";
import GoalCircle from "./Goal_Circle"; //Goal_Circle 컴포넌트 임포트
import News from "./News";
import Diet from "./Diet";
import Login from "./Login";
import SideMenu from "./SideMenu";
function SideContent() {
  // 로그인 상태를 관리
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuHidden, setMenuHidden] = useState(true);
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  const handleLogout = () => {
    // 로그아웃 처리 로직
    setIsLoggedIn(false);
    setMenuHidden(true);
  };

  return (
    <div id="SideContent">
      <div className="right-sidebar">
        {/* 데일리 상태 박스 */}
        {isLoggedIn && !menuHidden ? (
          <SideMenu onLogout={handleLogout} />
        ) : null}
        {isLoggedIn ? (
          <div id="daily-box">
            <p style={{ fontWeight: "bold" }}>안녕하세요! 김멀플님</p>
            <GoalCircle />
            {/* 일일 목표랑 그래프 */}
            {/* <div id="graph"></div> */}
            {/* 일일 목표량 확인란 */}
            {/* <div id="daily_container">
            <div>
              <p>체중</p>
              <p>kg</p>
            </div>
            <div>
              <p>운동량</p>
              <p>kcal</p>
            </div>
            <div>
              <p>식단</p>
              <p>kcal</p>
            </div>
          </div> */}
          </div>
        ) : (
          <Login onLogin={handleLogin} />
        )}

        {/* 추천 식단 / 건강뉴스 박스 */}
        <div id="news">
          <News></News>
          <Diet></Diet>
        </div>
      </div>

      {/* 우측 사이드 바의 footer*/}
      <footer>
        <p>멀티캠퍼스 2회차 2조</p>
        <p>작업자: 강수진, 김장훈, 이제형, 이진경, 정은정</p>
      </footer>
    </div>
  );
}

export default SideContent;
