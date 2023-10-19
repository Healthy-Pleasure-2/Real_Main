/*소스명 : Groupintro.js
작성자 : 정은정
이 페이지 용도 : 그룹 목록 화면
생성일자(수정일자) :*/

import React, { useState, useEffect } from "react";
import "../../Pages/styles/Community.css";
import { Link } from "react-router-dom";

function Groupintro({ groupData, selectedCategory }) {
  /*데이터값 확인*/
  console.log("데이터 값", groupData);
  console.log("카테고리 값", selectedCategory);

  const [itemsCount, setItemsCount] = useState(4); // 초기 갤러리 아이템 수
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // 화면 크기 변경 이벤트 리스너 등록
    const handleResize = () => {
      // 크기에 따라 동적으로 아이템 수 변경
      const windowWidth = window.innerWidth;
      if (windowWidth >= 1700) setItemsCount(12);
      else if (windowWidth >= 1400) setItemsCount(10);
      else if (windowWidth >= 1200) setItemsCount(8);
      else if (windowWidth >= 800) setItemsCount(6);
      else setItemsCount(4);
    };

    // 컴포넌트가 마운트될 때와 화면 크기가 변경될 때 이벤트 리스너 실행
    handleResize();
    window.addEventListener("resize", handleResize);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // 카테고리에 따라 그룹 필터링
  useEffect(() => {
    if (selectedCategory) {
      const filteredGroups = groupData.filter(
        (item) => item.category === selectedCategory
      );
      setFilteredGroups(filteredGroups);
    } else {
      // 선택된 카테고리가 없을 경우, 전체 그룹을 표시
      setFilteredGroups(groupData);
    }
  }, [selectedCategory, groupData]);

  // 페이지에 따라 그룹 필터링
  const itemsPerPage = itemsCount;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // 데이터를 itemsCount에 따라 잘라서 표시
  const visibleGalleryItems = filteredGroups.slice(startIndex, endIndex);

  // 그룹리스트 버튼 클릭 시 페이지 번호 업데이트
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="Community_GroupList">
      <div className="Community_Grouplists">
        <div className="Community_gallery">
          {visibleGalleryItems.map((group) => (
            <div className="Community_Gitem" key={group.id}>
              <Link to={`/GroupPage/${group.id}`} key={group.id}>
                <img
                  className="Community_Gcardimg"
                  src={group.img}
                  alt={group.name}
                />
                <div className="Community_cardcontent">
                  <h1 className="Community_Ggroupname">{group.name}</h1>
                </div>
                <div className="Community_caption">
                  <p className="Community_captionname">{group.name}</p>
                  <p>{group.goal}</p>
                  <p>{group.grouptotal}명</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="Community_Grouplistbtn">
        {Array.from({
          length: Math.ceil(filteredGroups.length / itemsPerPage),
        }).map((_, index) => (
          <button key={index + 1} onClick={() => handlePageClick(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
export default Groupintro;
