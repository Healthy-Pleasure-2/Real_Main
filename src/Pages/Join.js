// 소스명 : Join.js
// 작성자 : 이진경
// 이 페이지 용도 : 회원가입
// 생성일자(수정일자) : 23.10.16

import React, { useState } from "react";
import "./styles/Join.css";

function Join() {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    passwordCheck: "",
    nickname: "",
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., send data to a server)
  };

  return (
    <div id="Mypage">
      <div id="frame">
        <h1>회원가입</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>아이디</label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
            />
            <button>중복확인</button>
          </div>
          <div>
            <label>비밀번호</label>
            <input
              type="password"
              name="password"
              placeholder="영문자+숫자+특수문자 조합 8 ~ 25자리 입력하세요."
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>비밀번호 확인</label>
            <input
              type="password"
              name="passwordCheck"
              placeholder="비밀번호를 다시 입력해 주세요."
              value={formData.passwordCheck}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>닉네임</label>
            <input
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
            />
            <button>중복확인</button>
          </div>
          <div className="gender">
            <label>성별</label>
            <input type="radio" name="gender" value="male" checked />
            남
            <input type="radio" name="gender" value="female" />여
          </div>
          <div>
            <label>이름</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>이메일</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </form>
        <div className="signbtn">
          <button type="submit">회원가입하기</button>
        </div>
      </div>
    </div>
  );
}

export default Join;
