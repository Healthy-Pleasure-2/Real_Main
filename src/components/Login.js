// 231023 이진경 - 수정
import React from "react";
import { Link } from "react-router-dom";
import logo from "../logo.png";
import { useState } from "react";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const handleLogin = () => {
    onLogin(username, password); // 사용자명과 비밀번호를 전달하여 로그인 함수 실행
  }
  return (
    <div id="daily-box">
      <div className="Loginbox">
        <div className="LoginTitle">
          <h1>Welcome!</h1>
        </div>
        <div className="LoginIdPw">
          <input 
            className="Logininputid" 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="사용자명"
            ></input>
          <input
            className="Logininputpassword"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
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
