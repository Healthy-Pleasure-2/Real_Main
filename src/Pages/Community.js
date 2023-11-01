/*소스명 : Community.js
작성자 : 정은정
이 페이지 용도 : 그룹 커뮤니티 화면
생성일자(수정일자) : 10/20*/

import React, { useState, useEffect } from "react";
import "./styles/Community.css";
import { Link } from "react-router-dom";
import PopularRank from "../components/Community/PopularRank";
import Groupintro from "../components/Community/Groupintro";
import getGroupData from "../components/Community/getGroupData";

function Community({ isLoggedIn }) {
  const [selectedCategory, setSelectedCategory] = useState(""); // 추가: 선택된 카테고리 상태
  const [groupData, setGroupData] = useState([]); //그룹관련 json파일 상태

  //그룹 json 파일 관련
  useEffect(() => {
    const fetchGroupData = async () => {
      const result = await getGroupData();
      setGroupData(result);
    };
    fetchGroupData();
  }, []);

  //카테고리 선택시 카테고리  setSelectedCategory에 값 입력
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="Community_main">
      {/*인기 랭킹*/}
      <div className="Community_rank">
        <div className="Community_title">
          <div className="title_inner">
            <h3>
              인기 그룹 TOP <span>3</span>
            </h3>
            <p>크루가 많은 상위 커뮤니티 </p>
            <p>지금 참가해 보세요.</p>
          </div>
        </div>
        <PopularRank groupData={groupData} />
      </div>
      <div className="group_middle">
        <div className="group_list_subTitle">
          <h5>다른사용자의 그룹에도 참여해보세요!😊</h5>
        </div>
        {/*로그인 상태여야 그룹만들기 버튼 활성화*/}
        {isLoggedIn && (
          <div className="Community_groupbtn">
            <Link to="/GroupCreate" className="Community_link">
              <button>그룹 생성</button>
            </Link>
          </div>
        )}
      </div>

      {/*그룹목록*/}
      <div className="groupintro">
        <h3 className="group_list_title">Group List</h3>

        {/*카테고리, 그룹 생성*/}

        <div className="Community_groupcreate">
          {/*카테고리 클릭시 해당 카테고리로 이동*/}
          <button onClick={() => handleCategoryClick("운동")}>운동</button>
          <button onClick={() => handleCategoryClick("식단")}>식단</button>
          <button onClick={() => handleCategoryClick("다이어트")}>
            다이어트
          </button>
          <button onClick={() => handleCategoryClick("습관")}>습관</button>
        </div>
      </div>

      <Groupintro groupData={groupData} selectedCategory={selectedCategory} />
    </div>
  );
}
export default Community;
