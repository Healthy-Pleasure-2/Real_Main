/*
-소스명 : Id_pw.js
-작성자 : 이진경
-이 페이지 용도 : ID/PW 찾기 페이지
-생성일자(수정일자) : 231018 최초생성
--------------------------------------------------------------------------------------------------------------
-로그
231018 이진경 - 최초 생성, CSS 디자인 수정
231031 김장훈 - 서버 요청 작성
--------------------------------------------------------------------------------------------------------------
*/
import React, { useState } from "react";
import "./styles/Id_pw.css";
import { Link } from "react-router-dom";
import idpw from "../asset/idpw.png";

// ID 찾기 요청
const handleFindId = async (name, email) => { // email 변수명 수정
  try {
    const userData = {
      name: name,
      email: email, // 변수명 수정
    };
    const response = await fetch("http://localhost:3003/Find_id", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
      credentials: "include", // 쿠키 공유 활성화
    });
    if (response.ok) {
      const data = await response.json();
      if (data.message === "ID 찾기 성공") {
        alert(`${name} 회원님의 ID는: ${data.userid}입니다.`); // 변수명 수정
      } else {
        alert("ID를 찾을 수 없습니다.");
      }
    } else {
      alert("입력정보를 다시 확인해주세요.");
    }
  } catch (error) {
    console.error("ID 찾기 요청 실패:", error);
    alert("ID 찾기 요청 실패");
  }
};

// 비밀번호 찾기 요청
const handleFindPw = async (id, email) => {
  console.log(id);
  console.log(email);
  try {
    const userData = {
      id: id,
      email: email,
    };
    const response = await fetch("http://localhost:3003/Find_pw", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      if (data.message === "PW 찾기 성공") {
        alert(`${id} 회원님의 임시 비밀번호는: ${data.userpw}입니다.`);
      } else {
        alert("비밀번호를 찾을 수 없습니다.");
      }
    } else {
      alert("입력정보를 다시 확인해주세요.");
    }
  } catch (error) {
    console.error("PW 찾기 요청 실패:", error);
    alert("PW 찾기 요청 실패");
  }
};

// 아이디 찾기
function IdFind() {
  return (
    <div id="idFind">
      <input type="text" id="name" placeholder="Name" maxLength={5} />
      <input type="email" id="Find_Id_email" placeholder="Email" />
      <button id="send" onClick={() => handleFindId(document.getElementById("name").value, document.getElementById("Find_Id_email").value)}>ID 찾기</button>
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
      <input type="email" id="Find_Pw_email" placeholder="Email" />
      <button id="send" onClick={() => handleFindPw(document.getElementById("user-id").value, document.getElementById("Find_Pw_email").value)}>PW 찾기</button>
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
        <div className="container">
          <img src={idpw} alt="id/pw 이미지" />
          <h3>
            회원 정보를 잃어버리셨나요?
            <br></br>
            회원정보에 등록된 입력값을 입력해주세요.
          </h3>
        </div>
      </div>
      <div id="frame">
        <div className="container">
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
    </div>
  );
}

export default IdPw;