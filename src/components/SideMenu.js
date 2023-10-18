// 소스명 : SideMenu.js
// 작성자: 이진경
// 이 페이지 용도 : 왼쪽 메뉴
// 생성일자(수정일자) : 23.10.13
//  생성일자(수정일자) : 23.10.16 (로고수정)

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
import logo from "../logo.png";

function SideMenu() {
  return (
    <div id="navigation">
      {/* logo */}
      <div className="logoPlace">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo"></img>
          </Link>
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
        <Link to="/signup">
          <FontAwesomeIcon icon={faRightFromBracket} />
        </Link>
      </div>
    </div>
  );
}

export default SideMenu;
