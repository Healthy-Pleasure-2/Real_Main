/*
-소스명 : Login.js
-작성자 :_______ 
-이 페이지 용도 : 로그인 페이지
-생성일자(수정일자) : 2310__ 최초생성
-로그
2310__  _____ - 최초생성
231024 김장훈 - db.json 파일을 이용한 로그인기능 수정  -->> app.js로 옮김 (잘 되는지 보고 차후 코드 정리예정)
--------------------------------------------------------------------------------------------------------------*/

import React, { useState } from "react";
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