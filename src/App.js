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
<<<<<<< HEAD
=======
  // 로그인과 로그아웃의 상태 변경
>>>>>>> aeb559a2c24027bd715f52ba69dedf488b4efa09
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
<<<<<<< HEAD
        <SideMenu onLogout={handleLogout}></SideMenu>
        <PageContent></PageContent>
=======
        <SideMenu onLogout={handleLogout} isLoggedIn={isLoggedIn}></SideMenu>
        <PageContent isLoggedIn={isLoggedIn}></PageContent>
>>>>>>> aeb559a2c24027bd715f52ba69dedf488b4efa09
        <SideContent
          isLoggedIn={isLoggedIn}
          onLogin={handleLogin}
        ></SideContent>
      </div>
    </div>
  );
}
export default App;
