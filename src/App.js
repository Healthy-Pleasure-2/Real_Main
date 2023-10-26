/*
-소스명 : app.js
-작성자 :_______ 
-이 페이지 용도 : app.js
-생성일자(수정일자) : 2310__ 최초생성
-로그
2310__  _____ - 최초생성
231024 김장훈 - db.json 파일을 이용한 로그인기능
--------------------------------------------------------------------------------------------------------------*/
import "./App.css";
import React, { useState } from "react";
import PageContent from "./components/PageContent";
import SideMenu from "./components/SideMenu";
import SideContent from "./components/SideCotent";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태를 관리할 상태 변수와 상태 설정 함수를 생성하고 초기값을 false로 설정합니다.

  const handleLogin = async () => {
    // 로그인 요청을 서버로 보냅니다.
    const response = await fetch("http://localhost:3003/login", {
      method: "POST",
    });

    if (response.ok) {
      setIsLoggedIn(true);
    }
  };

  const handleLogout = async () => {
    // 로그아웃 요청을 서버로 보냅니다.
    const response = await fetch("http://localhost:3003/logout");

    if (response.ok) {
      setIsLoggedIn(false);
    }
  };

  return (
    <div className="App">
      <div className="wrap">
        <SideMenu onLogout={handleLogout} isLoggedIn={isLoggedIn}></SideMenu>
        <PageContent isLoggedIn={isLoggedIn}></PageContent>
        <SideContent isLoggedIn={isLoggedIn} onLogin={handleLogin}></SideContent>
      </div>
    </div>
  );
}

export default App;