// 231023 이진경 - 수정

import React from "react";
import { Link } from "react-router-dom";

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
        <div className="LoginTitle">
          <h1>Welcome!</h1>
        </div>
        <div className="LoginIdPw">
          <input className="Logininputid" type="text" placeholder="ID"></input>
          <input
            className="Logininputpassword"
            type="password"
            placeholder="PW"
          ></input>
        </div>
        <div>
          <label className="LoginCheckbox">
            <input type="checkbox" />
            로그인 상태 유지
          </label>
        </div>
        <button className="Loginbtn" onClick={handleLogin}>
          Login
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
