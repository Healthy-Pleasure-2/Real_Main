// src/components/GroupCreate.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/GroupCreate.css";

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
  const [createdGroup, setCreatedGroup] = useState(null);
  const [groupData, setGroupData] = useState({
    name: "",
    category: "",
    goal: "",
    groupintro: "",
    img: "",
  });
  const handleGroupDataChange = (event) => {
    const { name, value } = event.target;
    setGroupData({
      ...groupData,
      [name]: value,
    });
  };
  const handleCreateGroup = () => {
    // JSON Server에 POST 요청 보내기
    fetch("http://localhost:3005/group", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(groupData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          // 서버 응답에서 ID를 가져올 수 있다면
          console.log("값", data); // 서버 응답 데이터를 확인
          setCreatedGroup(data.id); // 서버 응답에서 얻은 ID를 설정
        } else {
          console.error("서버 응답에 ID가 없습니다.");
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
            <input
              type="text"
              size={90}
              name="name"
              value={groupData.name}
              onChange={handleGroupDataChange}
            />
            <button onClick={handleCreateGroup}>중복확인</button>
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
            <input
              type="text"
              name="groupintro"
              size={90}
              value={groupData.groupintro}
              onChange={handleGroupDataChange}
            ></input>
          </div>
          <div className="rep_img">
            <p>대표이미지</p>
            <input
              type="image"
              name="img"
              value={groupData.img}
              onChange={handleGroupDataChange}
            ></input>
            <button onClick={handleCreateGroup}>파일선택</button>
          </div>
        </div>
        <div className="create">
          <Link to={`/GroupPage/37`} onClick={handleCreateGroup}>
            생성하기
          </Link>
        </div>
      </div>
    </div>
  );
}

export default GroupCreate;
