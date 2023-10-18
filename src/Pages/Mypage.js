// 소스명 : Mypage.js
// 작성자 : 이진경
// 이 페이지 용도 : 회원정보 수정, 마이페이지
// 수정일자 : 23.10.16
// 수정일자 : 23.10.17 / 코드 전면 수정, 에러메시지 출력, 회원 탈퇴시 확인창 선택후 메인 페이지 이동

import React, { useState } from "react";
import "./styles/Mypage.css";
function Mypage() {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    confirmPassword: "",
    name: "",
    gender: "",
    nickname: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
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
    const passwordRegex = /^[A-Za-z0-9]{6,20}$/; //영문, 숫자 조합 6글자 이상
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    // Validate the form data
    let newErrors = { ...errors };
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
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "올바른 형식으로 작성해주세요.";
    } else {
      newErrors.email = "";
    }
    setErrors(newErrors);
    if (Object.values(newErrors).every((error) => error === "")) {
      console.log("Form data submitted:", formData);
    }
  };

  const withdrawal = () => {
    if (window.confirm("정말 회원 탈퇴를 하시겠습니까?")) {
      alert("탈퇴 완료되었습니다.");
      window.location = "http://localhost:3000/";
    } else {
      alert("취소합니다.");
    }
  };

  return (
    <div id="Mypage">
      <div id="frame">
        <h1>회원정보 수정</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>아이디</label>
            <input
              type="text"
              name="id"
              placeholder="admin ID"
              disabled
              value={formData.id}
              onChange={handleChange}
              required
            />
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
              name="passwordCheck"
              value={formData.passwordCheck}
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
              placeholder="admin name"
              disabled
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="gender">
            <label>성별</label>
            <input type="radio" name="gender" value="male" checked disabled />
            <span>남자</span>
            <input type="radio" name="gender" value="female" disabled />
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
          <div className="signbtn">
            <button type="submit">수정하기</button>
          </div>
        </form>
        <div className="withdrawal" onClick={withdrawal}>
          <button>회원탈퇴</button>
        </div>
      </div>
    </div>
  );
}
export default Mypage;
