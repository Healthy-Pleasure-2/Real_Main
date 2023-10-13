/*소스명 : Groupintro.js
작성자 : 정은정
이 페이지 용도 : 그룹 목록 화면
생성일자(수정일자) :*/

import React, { useState, useEffect } from "react";
import "../../Pages/styles/Community.css";

function Groupintro() {
  const Community_group = [
    // 10개의 갤러리 아이템 정보
    {
      id: 1,
      name: "갤러리 1",
      img: "https://cdn.pixabay.com/photo/2015/10/30/12/23/sport-1014049_1280.jpg",
    },
    {
      id: 2,
      name: "갤러리 2",
      img: "https://cdn.pixabay.com/photo/2015/10/30/12/23/sport-1014049_1280.jpg",
    },
    {
      id: 3,
      name: "갤러리 3",
      img: "https://cdn.pixabay.com/photo/2015/10/30/12/23/sport-1014049_1280.jpg",
    },
    {
      id: 4,
      name: "갤러리 4",
      img: "https://cdn.pixabay.com/photo/2015/10/30/12/23/sport-1014049_1280.jpg",
    },
    {
      id: 5,
      name: "갤러리 5",
      img: "https://cdn.pixabay.com/photo/2015/10/30/12/23/sport-1014049_1280.jpg",
    },
    {
      id: 6,
      name: "갤러리 6",
      img: "https://cdn.pixabay.com/photo/2015/10/30/12/23/sport-1014049_1280.jpg",
    },
    {
      id: 7,
      name: "갤러리 7",
      img: "https://cdn.pixabay.com/photo/2015/10/30/12/23/sport-1014049_1280.jpg",
    },
    {
      id: 8,
      name: "갤러리 8",
      img: "https://cdn.pixabay.com/photo/2015/10/30/12/23/sport-1014049_1280.jpg",
    },
    {
      id: 9,
      name: "갤러리 9",
      img: "https://cdn.pixabay.com/photo/2015/10/30/12/23/sport-1014049_1280.jpg",
    },
    {
      id: 10,
      name: "갤러리 10",
      img: "https://cdn.pixabay.com/photo/2015/10/30/12/23/sport-1014049_1280.jpg",
    },
    {
      id: 1,
      name: "갤러리 1",
      img: "https://cdn.pixabay.com/photo/2015/10/30/12/23/sport-1014049_1280.jpg",
    },
    {
      id: 2,
      name: "갤러리 2",
      img: "https://cdn.pixabay.com/photo/2015/10/30/12/23/sport-1014049_1280.jpg",
    },
    {
      id: 3,
      name: "갤러리 3",
      img: "https://cdn.pixabay.com/photo/2015/10/30/12/23/sport-1014049_1280.jpg",
    },
    {
      id: 4,
      name: "갤러리 4",
      img: "https://cdn.pixabay.com/photo/2015/10/30/12/23/sport-1014049_1280.jpg",
    },
    {
      id: 5,
      name: "갤러리 5",
      img: "https://cdn.pixabay.com/photo/2015/10/30/12/23/sport-1014049_1280.jpg",
    },
    {
      id: 6,
      name: "갤러리 6",
      img: "https://cdn.pixabay.com/photo/2015/10/30/12/23/sport-1014049_1280.jpg",
    },
    {
      id: 7,
      name: "갤러리 7",
      img: "https://cdn.pixabay.com/photo/2015/10/30/12/23/sport-1014049_1280.jpg",
    },
    {
      id: 8,
      name: "갤러리 8",
      img: "https://cdn.pixabay.com/photo/2015/10/30/12/23/sport-1014049_1280.jpg",
    },
    {
      id: 9,
      name: "갤러리 9",
      img: "https://cdn.pixabay.com/photo/2015/10/30/12/23/sport-1014049_1280.jpg",
    },
    {
      id: 10,
      name: "갤러리 10",
      img: "https://cdn.pixabay.com/photo/2015/10/30/12/23/sport-1014049_1280.jpg",
    },
  ];

  // 현재 화면 가로 크기에 따라 동적으로 결정할 최소 갤러리 아이템 수
  const calculateItemsCount = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 1200) return 12; // 대형 화면에서 10개 표시
    if (windowWidth >= 992) return 8; // 중형 화면에서 8개 표시
    if (windowWidth >= 768) return 6; // 중소형 화면에서 6개 표시
    return 4; // 작은 화면에서 4개 표시
  };

  const [itemsCount, setItemsCount] = useState(calculateItemsCount());

  useEffect(() => {
    // 화면 크기 변경 이벤트 리스너 등록
    const handleResize = () => {
      const newItemsCount = calculateItemsCount();
      setItemsCount(newItemsCount);
    };
    window.addEventListener("resize", handleResize);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const visibleGalleryItems = Community_group.slice(0, itemsCount);
  return (
    <div className="Grouplists">
      <div className="gallery">
        {visibleGalleryItems.map((item) => (
          <div className="Gitem" key={item.id}>
            <img className="cardimg" src={item.img} alt={item.name} />
            <div className="cardcontent">
              <h1 className="Groupname">{item.name}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Groupintro;
