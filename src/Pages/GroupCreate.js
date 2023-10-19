// src/components/GroupCreate.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/GroupCreate.css";

function GroupCreate() {
  const [groupName, setGroupName] = useState("");

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
  };

  const handleCreateGroup = () => {
    // 그룹 생성 로직을 구현하세요.
    console.log(`그룹 "${groupName}"을(를) 생성했습니다.`);
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
              placeholder="그룹 이름"
              size={90}
              value={groupName}
              onChange={handleGroupNameChange}
            />
            <button onClick={handleCreateGroup}>중복확인</button>
          </div>
          <div className="category">
            <p>카테고리</p>
            <input type="text" size={90} />
          </div>
          <div className="goal">
            <p>목표</p>
            <input type="text" size={90}></input>
          </div>
          <div className="group_int">
            <p>그룹소개</p>
            <input type="text" size={90}></input>
          </div>
          <div className="rep_img">
            <p>대표이미지</p>
            <input type="image"></input>
            <button onClick={handleCreateGroup}>파일선택</button>
          </div>
        </div>
        <div className="create">
          <Link to={`/GroupPage/37`}>생성하기</Link>
        </div>
      </div>
    </div>
  );
}

export default GroupCreate;
