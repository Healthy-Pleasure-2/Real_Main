/*소스명 : Groupintro.js
작성자 : 정은정
이 페이지 용도 : 그룹 목록 화면
생성일자(수정일자) :*/

import React, { useState, useEffect } from "react";
import "../../Pages/styles/Community.css";

function Groupintro({ groupData }) {
  /*데이터값 확인*/
  console.log("데이터 값", groupData);

  const [itemsCount, setItemsCount] = useState(4); // 초기 갤러리 아이템 수

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

  // 데이터를 itemsCount에 따라 잘라서 표시
  const visibleGalleryItems = groupData.slice(0, itemsCount);
  return (
    <div className="GroupList">
      <div className="Grouplists">
        <div className="gallery">
          {visibleGalleryItems.map((item) => (
            <div className="Gitem" key={item.id}>
              <img className="Gcardimg" src={item.img} alt={item.name} />
              <div className="cardcontent">
                <h1 className="Ggroupname">{item.name}</h1>
              </div>
              <div className="caption">
                <p className="captionname">{item.name}</p>
                <p>{item.goal}</p>
                <p>{item.grouptotal}명</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="Grouplistbtn">
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
        <button>5</button>
      </div>
    </div>
  );
}
export default Groupintro;
