import React from "react";
import GoalCircle from "./Goal_Circle"; //Goal_Circle 컴포넌트 임포트
import News from "./News";
import Login from "./Login";
function SideContent({ isLoggedIn, onLogin, sessiondata }) {
  return (
    <div id="SideContent">
      <div className="right-sidebar">
        {/* 데일리 상태 박스 */}
        {isLoggedIn ? (
          <div id="daily-box">
            <GoalCircle sessiondata={sessiondata} />
          </div>
        ) : (
          <Login onLogin={onLogin} />
        )}

        {/* 추천 식단 / 건강뉴스 박스 */}
        <div id="news">
          <News></News>
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
