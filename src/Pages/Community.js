import React from "react";
import "./styles/Community.css";
import { Link } from "react-router-dom";
import PopularRank from "../components/Community/PopularRank";

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
          <div id="gallery">
            <figure class="groupList">
              <img
                src=""
                alt=""
                title="Photo by Jeremy Doddridge for Unsplash"
              />
              <figcaption>8 PM, Summer</figcaption>
              <div class="caption">
                <p id="name">피버 타임</p>
                <p>하루에 물 3번 마시기</p>
                <p>86명</p>
              </div>
            </figure>
          </div>
        </div>
        <div className="Grouplistbtn"></div>
      </div>
    </div>
  );
}
export default Community;
