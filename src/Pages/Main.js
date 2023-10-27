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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn, faComments } from "@fortawesome/free-solid-svg-icons";

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
        <div className="image"></div>
        <div className="title">
          <div className="title_inner">
            <h3>함께해서 즐거운 건강관리</h3>
            <h1>Healthy Pleasure</h1>
            <p>커뮤니티를 통해 크루들과 함께하는 즐겁고 지속적인 건강관리</p>
            <div className="bt1">
              <button>Show Now</button>
            </div>
          </div>
        </div>
      </div>

      <div className="rank">
        <div className="title">
          <div className="title_inner">
            <h3>인기 상승 그룹</h3>
            <p>크루가 많은 TOP3 </p>
            <p>지금 참가해 보세요.</p>
            <div className="bt2">
              <button>More</button>
            </div>
          </div>
        </div>
        <PopularRank groupData={groupData} />
      </div>

      <div className="etc">
        <div className="Notice">
          <div className="etc_content">
            <h3>공지사항</h3>
            <p>다양한 소식, 뉴스, 이벤트등을 볼 수 있습니다.</p>
          </div>
          <div className="etc_icon1">
            {/* <FontAwesomeIcon icon={faBullhorn} /> */}
          </div>
        </div>

        <div className="Question">
          <div className="etc_content">
            <h3>자주 묻는 질문</h3>
            <p>다양한 소식, 뉴스, 이벤트등을 볼 수 있습니다.</p>
          </div>
          <div className="etc_icon2">
            {/* <FontAwesomeIcon icon={faComments} />{" "} */}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Main;
