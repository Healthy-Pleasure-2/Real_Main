/* 
-소스명 : SideMenu.js
-작성자 : 
-이 페이지 용도 : 왼쪽 사이드메뉴
-생성일자(수정일자) : 
------------------------------------------------------------------------------------------------------
-로그
231016 김장훈 - line:35 class -> className 수정 
*/

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPersonRunning,
  faUserGroup,
  faHeadset,
  faCircleUser,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

function SideMenu({ onLogout, hidden }) {
  // const location = useLocation();
  // const navigate = useNavigate();
  const handleLogout = () => {
    // 로그아웃 버튼을 클릭하면 onLogout 함수를 호출하여 로그아웃 상태를 변경
    onLogout();
  };
  const menuStyle = {
    display: hidden ? "none" : "block",
  };

  return (
    <div id="navigation" style={menuStyle}>
      {/* logo */}
      <div className="logoPlace">
        <div className="logo">
          <Link to="/">로고</Link>
        </div>
      </div>
      {/* 네비게이션 리스트 */}
      <ul className="nav-list">
        <li>
          <Link to="/todo">
            <FontAwesomeIcon icon={faPersonRunning} />
          </Link>
        </li>
        <li>
          <Link to="/community">
            <FontAwesomeIcon icon={faUserGroup} />
          </Link>
        </li>
        <li>
          <Link to="/ask">
            <FontAwesomeIcon icon={faHeadset} />
          </Link>
        </li>
        <li>
          <Link to="/mypage">
            <FontAwesomeIcon icon={faCircleUser} />
          </Link>
        </li>
      </ul>
      {/* 로그아웃 */}
      <div className="logout">
        <Link to="/" onClick={handleLogout}>
          <FontAwesomeIcon icon={faRightFromBracket} />
        </Link>
      </div>
    </div>
  );
}

export default SideMenu;
