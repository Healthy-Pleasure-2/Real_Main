// 소스명 : Id_pw.js
// 작성자 : 이진경
// 이 페이지 용도 : ID/PW 찾기 페이지
// 작성일자 : 23.10.18
//
import React, { useState } from "react";
import "./styles/Id_pw.css";
import { Link } from "react-router-dom";
import idpw from "../asset/idpw.png";

// 아이디 찾기
function IdFind() {
  return (
    <div id="idFind">
      <input type="text" id="name" placeholder="Name" maxLength={5} />
      <input type="email" id="email" placeholder="Email" />
      <button id="send">ID 찾기</button>
      <div>
        아직 회원이 아니신가요? <Link to="/signup">회원가입</Link>
      </div>
    </div>
  );
}

// 비밀번호 찾기
function PwFind() {
  return (
    <div id="pwFind">
      <input type="text" id="user-id" placeholder="ID" maxLength={10} />
      <input type="email" id="email" placeholder="Email" />
      <button id="send">PW 찾기</button>
      <div>
        아직 회원이 아니신가요? <Link to="/signup">회원가입</Link>
      </div>
    </div>
  );
}

// 아이디 비밀번호 찾기
function IdPw() {
  const [idFind, setIdFind] = useState(true);
  const [pwFind, setPwFind] = useState(false);

  const switchTab = (word) => {
    if (word === "idFind") {
      setIdFind(true);
      setPwFind(false);
    } else {
      setIdFind(false);
      setPwFind(true);
    }
  };

  return (
    <div id="IdPw">
      <div className="IdPw_left">
        <img src={idpw} alt="id/pw 이미지" />
        <h3>
          회원 정보를 잃어버리셨나요?
          <br></br>
          회원정보에 등록된 입력값을 입력해주세요.
        </h3>
      </div>
      <div id="frame">
        <div id="buttons">
          <div
            onClick={() => switchTab("idFind")}
            className={idFind ? "green" : "gray"}
          >
            ID 찾기
          </div>
          <div
            onClick={() => switchTab("pwFind")}
            className={pwFind ? "green" : "gray"}
          >
            PW 찾기
          </div>
        </div>
        <div id="idpw_content">
          {idFind && <IdFind />}
          {pwFind && <PwFind />}
        </div>
      </div>
    </div>
  );
}

export default IdPw;
