/*소스명 : Groupintro.js
작성자 : 정은정
이 페이지 용도 : 그룹 목록 화면
생성일자(수정일자) 231026 -21번줄 주석처리, 22번 줄 9로 변경 :*/

import React, { useState, useEffect } from "react";
import "../../Pages/styles/Community.css";
import { Link } from "react-router-dom";
import throttle from "lodash/throttle";

function Groupintro({ groupData, selectedCategory }) {
  const [itemsCount, setItemsCount] = useState(6); // 초기 갤러리 아이템 수
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // 상수로 매직 넘버를 정의
  const INITIAL_ITEM_COUNT = 6;
  const LARGE_SCREEN_WIDTH = 1700;
  const MEDIUM_SCREEN_WIDTH = 1200;
  const RESIZE_THROTTLE_INTERVAL = 250;

  useEffect(() => {
    const handleResize = throttle(() => {
      const windowWidth = window.innerWidth;
      if (windowWidth >= LARGE_SCREEN_WIDTH) setItemsCount(12);
      else if (windowWidth >= MEDIUM_SCREEN_WIDTH) setItemsCount(9);
      else setItemsCount(INITIAL_ITEM_COUNT);
    }, RESIZE_THROTTLE_INTERVAL); //250ms 간격으로 호출

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

    // 페이지 버튼을 최대 5개까지만 표시
  };
  const totalPages = Math.ceil(filteredGroups.length / itemsPerPage);
  const maxPageButtons = 5;
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(startPage + maxPageButtons - 1, totalPages);

  if (endPage - startPage < maxPageButtons - 1) {
    startPage = Math.max(1, endPage - maxPageButtons + 1);
  }
  return (
    <div className="Community_GroupList">
      <div className="Community_Grouplists">
        <div className="Community_gallery">
          {visibleGalleryItems.length === 0 ? (
            <p>No groups found</p>
          ) : (
            visibleGalleryItems.map((item_group) => (
              <div className="Community_Gitem" key={item_group.id}>
                <Link to={`/GroupPage/${item_group.id}`}>
                  <img
                    className="Community_Gcardimg"
                    src={item_group.img}
                    alt={item_group.name}
                  />
                  <div className="Community_cardcontent">
                    <h2>{item_group.name}</h2>
                    <h3>{item_group.goal}</h3>
                    <p>{item_group.grouptotal}명</p>
                  </div>
                  {/* <div className="Community_caption">
                  <p className="Community_captionname">{group.name}</p>
                  <p>{group.goal}</p>
                  <p>{group.grouptotal}명</p>
                </div> */}
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="Community_Grouplistbtn">
        {Array.from({ length: endPage - startPage + 1 }).map((_, btn_index) => (
          <button
            key={startPage + btn_index}
            onClick={() => handlePageClick(startPage + btn_index)}
          >
            {startPage + btn_index}
          </button>
        ))}
      </div>
    </div>
  );
}
export default Groupintro;
