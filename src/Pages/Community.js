/*소스명 : Community.js
작성자 : 정은정
이 페이지 용도 : 그룹 커뮤니티 화면
생성일자(수정일자) :*/

import React from "react";
import "./styles/Community.css";
import { Link } from "react-router-dom";
import PopularRank from "../components/Community/PopularRank";
import Groupintro from "../components/Community/Groupintro";

function Community() {
  return (
    <div className="main">
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
      <div className="rank">
        <div className="title">
          <p>인기 상승 그룹</p>
        </div>
        <PopularRank />
      </div>
      <div className="GroupList">
        <div className="Grouplists">
          <Groupintro />
        </div>
        <div className="Grouplistbtn"></div>
      </div>
    </div>
  );
}
export default Community;
