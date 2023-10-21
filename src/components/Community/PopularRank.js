/*소스명 : Groupintro.js
작성자 : 정은정
이 페이지 용도 : 인기상승 화면
<<<<<<< HEAD
생성일자(수정일자) :*/
=======
생성일자(수정일자) : 10/20*/
>>>>>>> aeb559a2c24027bd715f52ba69dedf488b4efa09

import React, { useState, useEffect, useMemo } from "react";
import "../../Pages/styles/Community.css";
import { Link } from "react-router-dom";

function PopularRank({ groupData }) {
  const initialGroups = useMemo(() => {
    const sortedData = [...groupData];
    sortedData.sort((a, b) => b.grouptotal - a.grouptotal);
    return sortedData.slice(0, 5);
  }, [groupData]); // 초기 그룹 목록
  const [groups, setGroups] = useState(initialGroups);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // 화면 가로 폭이 변경될 때 업데이트
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    // 이벤트 리스너 등록
    window.addEventListener("resize", handleResize);
    // 컴포넌트가 언마운트되면 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    // 그룹을 동적으로 조절
    const newGroupsCount = Math.max(2, Math.floor(windowWidth / 350));
    const newGroups = initialGroups.slice(0, newGroupsCount);
    setGroups(newGroups);
  }, [windowWidth, initialGroups]);

  return (
    <div className="Community_popularRank">
      {groups.map((group) => (
        <div className="Community_Rgroup" key={group}>
          <div className="Community_item">
            <Link to={`/GroupPage/${group.id}`} key={group.id}>
              <img
                className="Community_cardimg"
                src={group.img}
                alt={group.name}
              />
              <div className="Community_cardcontent">
                <h1 className="Community_Groupname">{group.name}</h1>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
export default PopularRank;
