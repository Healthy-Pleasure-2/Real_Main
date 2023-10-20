// 작성자: 이제형
// 소스명 Mygroup.js
// 페이지 용도: 개인별 목표 페이지 (나의 그룹 위젯)
// 생성 일자(수정 용도): 10/14

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import SimpleSlider from "./Slide";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Mygroup({ groupinfo }) {
  // 슬라이드의 개수: group.json의 길이
  // 버튼 개수도 슬라이드 개수만큼 생김
  // 버튼 누를때 그 인덱스 번호로 이동하는 걸로 생성

  return (
    <div id="todo_my_group">
      <h1 className="todo_h1">나의 그룹</h1>
      <SimpleSlider groupdata={groupinfo} />
    </div>
  );
}

export default Mygroup;
