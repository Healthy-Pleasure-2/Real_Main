import "./App.css";
import React, { useState, useEffect } from "react";
import PageContent from "./components/PageContent";
import SideMenu from "./components/SideMenu";
import SideContent from "./components/SideCotent";
import axios from "axios";
import Swal from "sweetalert2";
import Mypage from "./Pages/Mypage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sessiondata, setSessiondata] = useState(false);
  //쿠키값이 남아있으면 로그인 유지
  useEffect(() => {
    // 컴포넌트가 마운트될 때, 로그인 상태 확인
    axios
      .get("http://localhost:3003/cookie", { withCredentials: true })
      .then((response) => response.data)
      .then((data) => {
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
            Swal.fire(
              "로그인 실패",
              "일치하는 정보가 없습니다. 아이디 또는 비밀번호를 확인해주세요",
              "error"
            );
          }
        })
        .catch((error) => {
          console.error("서버 요청 오류:", error);
        });
    } catch (error) {
      console.error("로그인 요청 실패:", error);
      Swal.fire(
        "로그인 요청 실패",
        "죄송합니다. 현재 서버문제로 로그인 요청이 불가합니다.",
        "warning"
      );
      // alert("로그인 요청 실패");
    }
  };

  // 로그아웃 요청
  const handleLogout = async () => {
    axios
      .get("http://localhost:3003/logout", { withCredentials: true })
      .then(() => {
        setIsLoggedIn(false);
        setSessiondata(false);
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
        <Mypage
          sessiondata={sessiondata}
        ></Mypage>
      </div>
    </div>
  );
}

export default App;
