import React, { useState } from "react";
import "./styles/Signup.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    pw: "",
    confirmPassword: "",
    name: "",
    gender: "",
    nickname: "",
    email: "",
    term: false,
  });

  const [errors, setErrors] = useState({
    pw: "",
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

    // 폼 데이터 유효성 검사 
    let newErrors = { ...errors };

    if (!passwordRegex.test(formData.pw)) {
      newErrors.pw = "올바른 형식으로 입력해주세요.";
    } else {
      newErrors.pw = "";
    }

    if (formData.pw !== formData.confirmPassword) {
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
      fetch("http://localhost:3003/Signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "환영합니다",
            text: "회원가입 성공!!",
          }).then(() => {
            navigate("/");
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "죄송합니다.",
            text: "회원가입이 정상적으로 되지 않았습니다.",
          });
          console.log(error);
        });
    }
  };

  return (
    <div id="Signup">
      <div id="frame">
        <div className="Signup_left">
          <div className="icon"></div>
          <h1>회원가입</h1>
          <h3>
            Healthy Pleasure의
            <br></br>
            다양한 서비스를 경험해보세요.
          </h3>
        </div>

        <form onSubmit={handleSubmit}>
          <div>
            <label>아이디</label>
            <div className="Signup_check">
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleChange}
                required
                className="id_chcek"
              />
              <button>중복확인</button>
            </div>
          </div>
          <div>
            <label>비밀번호</label>
            <input
              type="password"
              name="pw"
              placeholder="영문+숫자 조합으로 6~20글자 입력해주세요."
              value={formData.pw}
              onChange={handleChange}
              required
              className="input"
            />
            <p className="error-message">{errors.pw}</p>
          </div>
          <div>
            <label>비밀번호 확인</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="input"
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
              className="input"
            />
            <p className="error-message">{errors.name}</p>
          </div>
          <div className="gender">
            <label>성별</label>
            <div className="gender_radio">
              <input type="radio" name="gender" value="male" defaultChecked />
              <span>남자</span>
              <input type="radio" name="gender" value="female" />
              <span>여자</span>
            </div>
          </div>
          <div>
            <label>닉네임</label>
            <div className="Signup_check">
              <input
                type="text"
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
                required
                className="id_chcek"
              />
              <button>중복확인</button>
            </div>
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
              className="input"
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
              ></input>
              이용약관 개인정보 수집 및 이용, 마케팅 활용 선택에 모두
              동의합니다.
            </label>
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
