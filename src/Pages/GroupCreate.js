// src/components/GroupCreate.js
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./styles/GroupCreate.css";
import Swal from "sweetalert2";
//import getGroupData from "../components/Community/getGroupData";

function GroupCreate({ sessiondata }) {
  /* 수정전
  const [groupName, setGroupName] = useState("");
  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
  };
  
  const handleCreateGroup = () => {
    // 그룹 생성 로직을 구현하세요.
    console.log(`그룹 "${groupName}"을(를) 생성했습니다.`);
  };*/
  const [groupData, setGroupData] = useState({
    name: "",
    category: "",
    goal: "",
    grouptotal: 1,
    groupintro: "",
    img: "",
  });

  // 이미지 미리보기
  const [imgFile, setImgFile] = useState("");
  const imgRef = useRef();

  const handleGroupDataChange = (event) => {
    const { name, value } = event.target;

    // 이미지 업로드 input의 onChange
    if (name === "img") {
      const file = imgRef.current.files[0];

      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setImgFile(reader.result);
          setGroupData((prevGroupData) => ({
            ...prevGroupData,
            img: reader.result,
          }));
        };
      } else {
        // 파일이 선택되지 않았을 때 또는 file이 null인 경우 처리
        setImgFile(""); // 빈 문자열로 초기화 또는 다른 기본 이미지 처리
        setGroupData((prevGroupData) => ({
          ...prevGroupData,
          [name]: value,
        }));
      }
    } else {
      setGroupData((prevGroupData) => ({
        ...prevGroupData,
        [name]: value,
      }));
    }
  };

  const handleCreateGroup = () => {
    const userId = sessiondata;
    console.log(userId);
    // POST 요청 보내기
    fetch(`http://localhost:3003/groupadd/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(groupData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "그룹생성성공") {
          Swal.fire({
            title: "생성완료",
            text: "새로운 그룹을 생성하셨습니다.",
            icon: "success",
            confirmButtonColor: "#A7C957",
          });
        } else {
          Swal.fire({
            title: "생성실패",
            text: "다시 생성해주세요.",
            icon: "error",
            confirmButtonColor: "#A7C957",
          });
        }
      })
      .catch((error) => {
        console.error("서버 요청 오류:", error);
      });
  };

  return (
    <div className="group_create">
      <div id="frame">
        <h1>그룹 생성하기</h1>
        <div className="group">
          <div className="group_name">
            <p>그룹 명</p>
            <div className="group_name_check">
              <input
                type="text"
                size={90}
                name="name"
                value={groupData.name}
                onChange={handleGroupDataChange}
              />
              <button>중복확인</button>
            </div>
          </div>
          <div className="category">
            <p>카테고리</p>
            <select
              className="category"
              name="category"
              onChange={handleGroupDataChange}
            >
              <option value="">카테고리 선택</option>
              <option value="운동">운동</option>
              <option value="식단">식단</option>
              <option value="다이어트">다이어트</option>
              <option value="습관">습관</option>
            </select>
          </div>
          <div className="goal">
            <p>목표</p>
            <input
              type="text"
              size={90}
              name="goal"
              value={groupData.goal}
              onChange={handleGroupDataChange}
            ></input>
          </div>
          <div className="group_int">
            <p>그룹소개</p>
            <textarea
              type="text"
              name="groupintro"
              size={90}
              value={groupData.groupintro}
              onChange={handleGroupDataChange}
            ></textarea>
          </div>
          <div className="rep_img">
            <p>대표이미지</p>
            <div className="file_img">
              <img
                src={imgFile ? imgFile : `/images/icon/user.png`}
                alt="프로필 이미지"
              />
            </div>
            <label htmlFor="profileImg">
              파일 선택
              <input
                type="file"
                name="img"
                //value={groupData.img}
                onChange={handleGroupDataChange}
                id="profileImg"
                ref={imgRef}
              ></input>
            </label>
          </div>
        </div>
        <div className="create">
          <Link to={`/community`}>
            <button onClick={handleCreateGroup}>생성하기</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default GroupCreate;
