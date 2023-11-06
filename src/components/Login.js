import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import {
  faGoogle,
  faFacebook,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    onLogin(username, password); // 사용자명과 비밀번호를 전달하여 로그인 함수 실행
  };
  return (
    <div id="daily-box">
      <div className="Loginbox">
        <div className="LoginTitle">
          <h1>Welcome!</h1>
          <h5>
            목표달성을 위한 커뮤니티 <br></br>헬시플레저에 오신걸 환영합니다
          </h5>
        </div>
        <div className="LoginIdPw">
          <div className="LoginID">
            <div className="LoginIcon">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <input
              className="Logininputid"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="사용자명"
            ></input>
          </div>
          <div className="LoginPW">
            <div className="LoginIcon">
              <FontAwesomeIcon icon={faLock} />
            </div>
            <input
              className="Logininputpassword"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
            ></input>
          </div>
        </div>
        <button className="Loginbtn" onClick={handleLogin}>
          Login
        </button>
        <div className="LoginSns">
          <p>간편 로그인</p>
          <p>
            <FontAwesomeIcon icon={faGoogle} />
          </p>
          <p>
            <FontAwesomeIcon icon={faFacebook} />
          </p>
          <p>
            <FontAwesomeIcon icon={faTwitter} />
          </p>
        </div>
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
