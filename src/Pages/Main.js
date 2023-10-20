/* 
-소스명 : main.js
-작성자 : 김장훈
-이 페이지 용도 : 메인페이지
-생성일자(수정일자) : 231016
--------------------------------------------------------------------------------------------------------------
-로그
231016 김장훈 - 최초작성
231020 이진경 - 수정
*/

import React, { useState, useEffect } from "react";
import "./styles/main.css";
import PopularRank from "../components/Community/PopularRank";
import getGroupData from "../components/Community/getGroupData";

function Main() {
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
      <div className="Hello">
        <div className="title">
          <p>Healthy Pleasure에 오신걸 환영합니다.</p>
        </div>
        <div className="bt1">
          <button>운동</button>
          <button>식단</button>
          <button>다이어트</button>
          <button>습관</button>
        </div>
      </div>

      <div className="rank">
        <div className="title">
          <p>인기 상승 그룹</p>
        </div>
        <PopularRank groupData={groupData} />
      </div>

      <div className="etc">
        <div className="Notice">
          <p>
            공지사항<button className="bt2">+</button>
          </p>
        </div>

        <div className="Question">
          <p>
            자주 묻는 질문<button className="bt2">+</button>
          </p>
        </div>
      </div>
    </div>
  );
}
export default Main;
