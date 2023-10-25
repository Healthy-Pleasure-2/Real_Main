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

  const handleLogin = async (username, password) => {
    try {
      const userData = {
        id: username, // 사용자가 입력한 username을 id로 설정
        pw: password, // 사용자가 입력한 password를 pw로 설정
      };

      // 서버로 로그인 요청을 보냅니다.
      fetch("http://localhost:3003/user", {
        method: "POST", // HTTP POST 요청을 사용
        headers: {
          "Content-Type": "application/json", // 요청 본문이 JSON 형식임을 명시
        },
        body: JSON.stringify(userData), // 요청 본문에 사용자 데이터를 JSON 형식으로 변환하여 추가
      })
        .then((response) => response.json()) // 서버 응답 데이터를 JSON 형식으로 파싱
        .then((data) => {
          if (data.message === "로그인 성공") {
            setIsLoggedIn(true); // 로그인 성공 시, 로그인 상태를 true로 설정
          } else {
            alert("로그인 실패"); // 로그인 실패 시 경고창을 띄웁니다.
          }
        })
        .catch((error) => {
          console.error("서버 요청 오류:", error); // 서버 요청 중에 오류가 발생한 경우 에러를 콘솔에 기록
        });
    } catch (error) {
      console.error("로그인 요청 실패:", error); // 로그인 요청 함수 자체에서 오류가 발생한 경우 에러를 콘솔에 기록
      alert("로그인 요청 실패"); // 로그인 요청 실패 시 경고창을 띄웁니다.
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // 로그아웃 버튼 클릭 시, 로그인 상태를 false로 설정하여 로그아웃 상태로 변경
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
