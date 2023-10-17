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

function SideMenu() {
  // const location = useLocation();
  // const navigate = useNavigate();

  //로그아웃 버튼 클릭시 로그아웃

  return (
    <div id="navigation">
      {/* logo */}
      <div className="logoPlace">
        <div className="logo">
          <Link to="/">로고</Link>
        </div>
      </div>
      {/* 네비게이션 리스트 */}
      <ul class="nav-list">
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
        <Link to="/">
          <FontAwesomeIcon icon={faRightFromBracket} />
        </Link>
      </div>
    </div>
  );
}

export default SideMenu;
