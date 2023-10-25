import "./App.css";
import React, { useState } from "react";
import PageContent from "./components/PageContent";
import SideMenu from "./components/SideMenu";
import SideContent from "./components/SideCotent";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (username, password) => {
    try {
      const userData = {
        id: username,
        pw: password,
      };

      fetch("http://localhost:3000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "로그인 성공") {
            setIsLoggedIn(true);
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

  const handleLogout = () => {
    setIsLoggedIn(false);
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