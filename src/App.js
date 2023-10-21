import "./App.css";
import React, { useState } from "react";
import PageContent from "./components/PageContent";
import SideMenu from "./components/SideMenu";
import SideContent from "./components/SideCotent";

<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1"
/>;

function App() {
  // 로그인과 로그아웃의 상태 변경
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <div className="wrap">
        <SideMenu onLogout={handleLogout} isLoggedIn={isLoggedIn}></SideMenu>
        <PageContent isLoggedIn={isLoggedIn}></PageContent>
        <SideContent
          isLoggedIn={isLoggedIn}
          onLogin={handleLogin}
        ></SideContent>
      </div>
    </div>
  );
}
export default App;
