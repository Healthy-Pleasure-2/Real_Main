import React from "react";
import { Link } from "react-router-dom";
import logo from "../logo.png";

function Login({ onLogin }) {
  const handleLogin = () => {
    // 로그인 처리 로직
    // ...
    // 로그인 버튼을 클릭하면 onLogin 콜백을 호출하여 로그인 상태를 변경
    onLogin();
  };
  return (
    <div id="daily-box">
      <div className="Loginbox">
        <div className="LoginLogo">
          <img src={logo} alt="logo"></img>
        </div>
        <div className="LoginIdPw">
          <input className="Logininputid" type="text"></input>
          <input className="Logininputpassword" type="password"></input>
        </div>
        <button className="Loginbtn" onClick={handleLogin}>
          로그인
        </button>
        <div className="LoginFind">
          <button className="LoginIdPwFind">
            <Link to="/idpw" className="LoginbtnLink">
              ID 찾기 / PW 찾기
            </Link>
          </button>
          <button className="Loginsingnup">
            <Link to="/signup" className="LoginbtnLink">
              회원가입
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
export default Login;
