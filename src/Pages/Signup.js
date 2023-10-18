// 소스명 : Signup.js
// 작성자 : 이진경
// 이 페이지 용도 : 회원가입
// 수정일자 : 23.10.16
// 수정일자 : 23.10.17 / 코드 전면 수정, 에러메시지 출력, 회원가입시 메인페이지로 이동

import React, { useState } from "react";
import "./styles/Signup.css";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: "",
    password: "",
    confirmPassword: "",
    name: "",
    gender: "",
    nickname: "",
    email: "",
    term: false,
  });

  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 정규식
    const idRegex = /^[a-zA-Z0-9_]+$/; //공백없는 숫자와 대소문자
    const passwordRegex = /^[A-Za-z0-9]{6,20}$/; //영문, 숫자 조합 6글자 이상

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    // Validate the form data
    let newErrors = { ...errors };

    if (!idRegex.test(formData.id)) {
      newErrors.id = "공백없이 숫자, 대소문자만 입력해주세요.";
    } else {
      newErrors.id = "";
    }

    if (!passwordRegex.test(formData.password)) {
      newErrors.password = "올바른 형식으로 입력해주세요.";
    } else {
      newErrors.password = "";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    } else {
      newErrors.confirmPassword = "";
    }
    if (formData.name.length === 0 || formData.name.length < 2) {
      newErrors.name = "이름은 최소 2글자 이상 입력해야 합니다.";
    } else {
      newErrors.name = "";
    }
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "올바른 형식으로 작성해주세요.";
    } else {
      newErrors.email = "";
    }

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => error === "")) {
      console.log("Form data submitted:", formData);
      navigate("/");
    }
  };

  return (
    <div id="Signup">
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
              required
            />
            <button>중복확인</button>
            <p className="error-message">{errors.id}</p>
          </div>
          <div>
            <label>비밀번호</label>
            <input
              type="password"
              name="password"
              placeholder="영문+숫자 조합으로 6~20글자 입력해주세요."
              value={formData.password}
              onChange={handleChange}
              required
            />
            <p className="error-message">{errors.password}</p>
          </div>
          <div>
            <label>비밀번호 확인</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <p className="error-message">{errors.confirmPassword}</p>
          </div>
          <div>
            <label>이름</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <p className="error-message">{errors.name}</p>
          </div>
          <div className="gender">
            <label>성별</label>
            <input type="radio" name="gender" value="male" checked />
            <span>남자</span>
            <input type="radio" name="gender" value="female" />
            <span>여자</span>
          </div>

          <div>
            <label>닉네임</label>
            <input
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              required
            />
            <button>중복확인</button>
          </div>

          <div>
            <label>이메일</label>
            <input
              type="email"
              name="email"
              placeholder="aaa@test.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <p className="error-message">{errors.email}</p>
          </div>

          <div className="user-term">
            <label>
              <input
                name="user-term"
                value={formData.term}
                onChange={handleChange}
                type="checkbox"
                // checked={formData.term.checkboxChecked}
              ></input>
              이용약관 개인정보 수집 및 이용, 마케팅 활용 선택에 모두
              동의합니다.
            </label>
            {/* <p className="error-message">{errors.term}</p> */}
          </div>
          <div className="signbtn">
            <button type="submit">회원가입 하기</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
