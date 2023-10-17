// 소스명 : Signup.js
// 작성자 : 이진경
// 이 페이지 용도 : 회원가입
// 생성일자(수정일자) : 23.10.16

import React, { useState } from "react";
import "./styles/Signup.css";

function Signup() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nick, setNick] = useState("");
  const [name, setName] = useState("");

  const [term, setTerm] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [termError, setTermError] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    /**검증 로직 만들기
     * 1. 비밀번호와 비밀번호 체크가 다를 경우를 검증한다
     * 2. 약관 동의를 확인한다.
     */
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
  };

  // Coustom Hook 이전
  const onChangeId = (e) => {
    setId(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onChangePasswordChk = (e) => {
    //비밀번호를 입력할때마다 password 를 검증하는 함수
    setPasswordError(e.target.value !== password);
    setPasswordCheck(e.target.value);
  };

  const onChangeNick = (e) => {
    setNick(e.target.value);
  };

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeTerm = (e) => {
    //체크박스 초기화
    setTermError(false);
    setTerm(e.target.checked);
  };

  return (
    <div id="Signup">
      <div id="frame">
        <h1>회원가입</h1>
        <form onSubmit={onSubmit} style={{ padding: 10 }}>
          <div>
            <label htmlFor="user-id">아이디</label>
            <input name="user-id" value={id} required onChange={onChangeId} />
            <button>중복확인</button>
          </div>

          <div>
            <label htmlFor="user-password">비밀번호</label>
            <input
              name="user-password"
              type="password"
              value={password}
              required
              onChange={onChangePassword}
            />
          </div>
          <div>
            <label htmlFor="user-password-check">비밀번호체크</label>
            <input
              name="user-password-check"
              type="password"
              value={passwordCheck}
              required
              onChange={onChangePasswordChk}
            />
            {passwordError && (
              <div className="Error">비밀번호가 일치하지 않습니다.</div>
            )}
          </div>
          <div>
            <label htmlFor="user-nick">닉네임</label>
            <input
              name="user-nick"
              value={nick}
              required
              onChange={onChangeNick}
            />
            <button>중복확인</button>
          </div>
          <div>
            <label htmlFor="user-name">이름</label>
            <input
              name="user-name"
              value={name}
              required
              onChange={onChangeName}
            />
          </div>
          <div>
            <label htmlFor="user-name">이메일</label>
            <input
              name="user-name"
              value={name}
              required
              onChange={onChangeName}
            />
          </div>
          <div className="user-term">
            <label>
              <input
                name="user-term"
                value={term}
                onChange={onChangeTerm}
                type="checkbox"
              ></input>
              이용약관에 동의 합니다.
            </label>

            {termError && (
              <div style={{ color: "red" }}>약관에 동의하셔야 합니다.</div>
            )}
          </div>
        </form>
        <div className="signbtn">
          <button type="submit">회원가입 하기</button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
