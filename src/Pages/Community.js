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

  useEffect(() => {
    const fetchGroupData = async () => {
      const result = await getGroupData();
      setGroupData(result);
    };
    fetchGroupData();
  }, []);

  return (
    <div className="main">
      {/*상단 메뉴(카테고리), 그룹 생성*/}
      <div className="menu">
        <div className="groupcreate">
          <button>운동</button>
          <button>식단</button>
          <button>다이어트</button>
          <button>습관</button>
        </div>
        <div className="groupbtn">
          <button>
            <Link to="/GroupCreate" className="link">
              그룹만들기
            </Link>
          </button>
        </div>
      </div>
      {/*인기 랭킹*/}
      <div className="rank">
        <div className="communitytitle">
          <p>인기 상승 그룹</p>
        </div>
        <PopularRank groupData={groupData} />
      </div>
      {/*그룹목록*/}
      <Groupintro groupData={groupData} />
    </div>
  );
}
export default Community;
