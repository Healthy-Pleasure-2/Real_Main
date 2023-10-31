/*
-소스명 : app.js
-작성자 :_______ 
-이 페이지 용도 : app.js
-생성일자(수정일자) : 2310__ 최초생성
-로그
2310__  _____ - 최초생성
231024 김장훈 - db.json 파일을 이용한 로그인 요청 기능 구현
--------------------------------------------------------------------------------------------------------------*/
import "./App.css";
import React, { useState, useEffect } from "react";
import PageContent from "./components/PageContent";
import SideMenu from "./components/SideMenu";
import SideContent from "./components/SideCotent";
import axios from "axios";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sessiondata, setSessiondata] = useState();
  //쿠키값이 남아있으면 로그인 유지
  useEffect(() => {
    // 컴포넌트가 마운트될 때, 로그인 상태 확인
    axios
      .get("http://localhost:3003/cookie", { withCredentials: true })
      .then((response) => response.data)
      .then((data) => {
        //console.log(data);
        if (data.message === "로그인상태") {
          setIsLoggedIn(true);
          setSessiondata(data.userid);
        }
      })
      .catch(() => {
        setIsLoggedIn(false);
      });
  }, []);
  //로그인 확인
  const handleLogin = async (username, password) => {
    try {
      const userData = {
        id: username,
        pw: password,
      };

      fetch("http://localhost:3003/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        credentials: "include", // 쿠키 공유 활성화
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "로그인 성공") {
            setIsLoggedIn(true);
            setSessiondata(data.userid);
          } else {
            alert("로그인 실패");
          }
        })
        .catch((error) => {
          console.error("서버 요청 오류:", error);
        });
    } catch (error) {
      console.error("로그인 요청 실패:", error);
      alert("로그인 요청 실패");
    }
  };

  // 로그아웃 요청
  const handleLogout = async () => {
    axios
      .get("http://localhost:3003/logout", { withCredentials: true })
      .then(() => {
        setIsLoggedIn(false);
        setSessiondata("");
      })
      .catch((error) => {
        console.error("로그아웃 오류:", error);
      });
  };
  return (
    <div className="App">
      <div className="wrap">
        <SideMenu onLogout={handleLogout} isLoggedIn={isLoggedIn}></SideMenu>
        <PageContent
          isLoggedIn={isLoggedIn}
          sessiondata={sessiondata}
        ></PageContent>
        <SideContent
          isLoggedIn={isLoggedIn}
          onLogin={handleLogin}
          sessiondata={sessiondata}
        ></SideContent>
      </div>
    </div>
  );
}

export default App;
