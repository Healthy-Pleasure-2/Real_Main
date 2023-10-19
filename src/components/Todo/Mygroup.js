// 작성자: 이제형
// 소스명 Mygroup.js
// 페이지 용도: 개인별 목표 페이지 (나의 그룹 위젯)
// 생성 일자(수정 용도): 10/14

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
// import SimpleSlider from "./Slide";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

function Mygroup({ groupinfo }) {
  // 슬라이드의 개수: group.json의 길이
  // 버튼 개수도 슬라이드 개수만큼 생김
  // 버튼 누를때 그 인덱스 번호로 이동하는 걸로 생성
  const data = [
    {
      id: 1,
      name: "채식을 위하여",
      category: "식단",
      img: "https://cdn.pixabay.com/photo/2017/10/09/19/29/eat-2834549_1280.jpg",
      goal: "일주일에 3번 채소 먹기",
      grouptotal: 86,
    },
    {
      id: 2,
      name: "독서왕",
      category: "습관",
      img: "https://cdn.pixabay.com/photo/2016/06/16/08/39/cat-1460882_1280.png",
      goal: "주당 2권의 책 읽기",
      grouptotal: 32,
    },
    {
      id: 3,
      name: "크로스핏",
      category: "운동",
      img: "https://cdn.pixabay.com/photo/2016/01/08/01/53/gymer-1126999_1280.jpg",
      goal: "매일 2시간 크로스핏 운동하기",
      grouptotal: 55,
    },
    {
      id: 4,
      name: "건강을 위하여",
      category: "다이어트",
      img: "https://cdn.pixabay.com/photo/2016/01/08/01/53/gymer-1126999_1280.jpg",
      goal: "건강을 위해 체중 감량",
      grouptotal: 45,
    },
    {
      id: 5,
      name: "저탄고지식단",
      category: "식단",
      img: "https://cdn.pixabay.com/photo/2019/05/12/18/56/starter-4198752_1280.jpg",
      goal: "당뇨 식단 관리",
      grouptotal: 18,
    },
  ];

  return (
    <div id="my_group">
      <h1>나의 그룹</h1>
      <div groupinfo={groupinfo} />
    </div>
  );
}

export default Mygroup;
