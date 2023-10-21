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

<<<<<<< HEAD
function SideMenu({ onLogout }) {
=======
function SideMenu({ isLoggedIn, onLogout }) {
>>>>>>> aeb559a2c24027bd715f52ba69dedf488b4efa09
  // const location = useLocation();
  // const navigate = useNavigate();
  const handleLogout = () => {
    // 로그아웃 버튼을 클릭하면 onLogout 함수를 호출하여 로그아웃 상태를 변경
    onLogout();
  };

  // 로그아웃 버튼을 클릭하면 onLogout 함수를 호출하여 로그아웃 상태를 변경
  const handleLogout = () => {
    onLogout();
  };

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
        {/* 로그아웃 버튼과 마이페이지 버튼은 로그인 상태에 따라 렌더링 */}
        {isLoggedIn && (
          <li>
            <Link to="/mypage">
              <FontAwesomeIcon icon={faCircleUser} />
            </Link>
          </li>
        )}
      </ul>
<<<<<<< HEAD
      {/* 로그아웃 */}
      <div className="logout" onClick={handleLogout}>
        <Link to="/">
          <FontAwesomeIcon icon={faRightFromBracket} />
        </Link>
      </div>
=======
      {/* 로그아웃 버튼과 마이페이지 버튼은 로그인 상태에 따라 렌더링 */}
      {isLoggedIn && (
        <div className="logout" onClick={handleLogout}>
          <Link to="/">
            <FontAwesomeIcon icon={faRightFromBracket} />
          </Link>
        </div>
      )}
>>>>>>> aeb559a2c24027bd715f52ba69dedf488b4efa09
    </div>
  );
}

export default SideMenu;
