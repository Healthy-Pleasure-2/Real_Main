import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPersonRunning,
  faUserGroup,
  faHeadset,
  faCircleUser,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import logo from "../asset/logo.png";

function SideMenu({ isLoggedIn, onLogout }) {
  // 로그아웃 버튼을 클릭하면 onLogout 함수를 호출하여 로그아웃 상태를 변경
  const handleLogout = () => {
    onLogout();
  };

  //네비 눌렀을떄 흰색 박스 유지
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };
  const handleLogoClick = () => {
    setSelectedMenuItem(null);
  };

  return (
    <div id="navigation">
      {/* logo */}
      <div className="logoPlace">
        <div className="logo">
          <Link to="/" onClick={handleLogoClick}>
            <img src={logo} alt="logo"></img>
          </Link>
        </div>
      </div>
      {/* 네비게이션 리스트 */}
      <ul className="nav-list">
        <li
          className={selectedMenuItem === "item1" ? "selected" : ""}
          onClick={() => handleMenuItemClick("item1")}
        >
          <Link to="/todo">
            <FontAwesomeIcon icon={faPersonRunning} />
          </Link>
        </li>
        <li
          className={selectedMenuItem === "item2" ? "selected" : ""}
          onClick={() => handleMenuItemClick("item2")}
        >
          <Link to="/community">
            <FontAwesomeIcon icon={faUserGroup} />
          </Link>
        </li>
        <li
          className={selectedMenuItem === "item3" ? "selected" : ""}
          onClick={() => handleMenuItemClick("item3")}
        >
          <Link to="/ask">
            <FontAwesomeIcon icon={faHeadset} />
          </Link>
        </li>
        {/* 로그아웃 버튼과 마이페이지 버튼은 로그인 상태에 따라 렌더링 */}
        {isLoggedIn && (
          <li
            className={selectedMenuItem === "item4" ? "selected" : ""}
            onClick={() => handleMenuItemClick("item4")}
          >
            <Link to="/mypage">
              <FontAwesomeIcon icon={faCircleUser} />
            </Link>
          </li>
        )}
      </ul>
      {/* 로그아웃 버튼과 마이페이지 버튼은 로그인 상태에 따라 렌더링 */}
      {isLoggedIn && (
        <div className="logout" onClick={handleLogout}>
          <Link to="/">
            <FontAwesomeIcon icon={faRightFromBracket} />
          </Link>
        </div>
      )}
    </div>
  );
}

export default SideMenu;
