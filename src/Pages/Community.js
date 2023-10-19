/*소스명 : Community.js
작성자 : 정은정
이 페이지 용도 : 그룹 커뮤니티 화면
생성일자(수정일자) : 10/16*/

import React, { useState, useEffect } from "react";
import "./styles/Community.css";
import { Link } from "react-router-dom";
import PopularRank from "../components/Community/PopularRank";
import Groupintro from "../components/Community/Groupintro";
import getGroupData from "../components/Community/getGroupData";

function Community() {
  const [groupData, setGroupData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(""); // 추가: 선택된 카테고리 상태

  useEffect(() => {
    const fetchGroupData = async () => {
      const result = await getGroupData();
      setGroupData(result);
    };
    fetchGroupData();
  }, []);
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="Community_main">
      {/*상단 메뉴(카테고리), 그룹 생성*/}
      <div className="Community_menu">
        <div className="Community_groupcreate">
          <button onClick={() => handleCategoryClick("운동")}>운동</button>
          <button onClick={() => handleCategoryClick("식단")}>식단</button>
          <button onClick={() => handleCategoryClick("다이어트")}>
            다이어트
          </button>
          <button onClick={() => handleCategoryClick("습관")}>습관</button>
        </div>
        <div className="Community_groupbtn">
          <button>
            <Link to="/GroupCreate" className="Community_link">
              그룹만들기
            </Link>
          </button>
        </div>
      </div>
      {/*인기 랭킹*/}
      <div className="Community_rank">
        <div className="Community_title">
          <p>인기 상승 그룹</p>
        </div>
        <PopularRank groupData={groupData} />
      </div>
      {/*그룹목록*/}
      <Groupintro groupData={groupData} selectedCategory={selectedCategory} />
    </div>
  );
}
export default Community;
