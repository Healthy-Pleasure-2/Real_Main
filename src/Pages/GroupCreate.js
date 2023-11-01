// src/components/GroupCreate.js
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./styles/GroupCreate.css";
//import getGroupData from "../components/Community/getGroupData";

function GroupCreate() {
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
    setGroupData({
      ...groupData,
      [name]: value,
    });

    // 이미지 업로드 input의 onChange
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };

  const handleCreateGroup = () => {
    // POST 요청 보내기
    fetch("http://localhost:3003/groupadd", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(groupData),
    }).catch((error) => {
      console.error("서버 요청 오류:", error);
    });
    window.alert("새로운 그룹이 생성되었습니다.");
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
                value={groupData.img}
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
