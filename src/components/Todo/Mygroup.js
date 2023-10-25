// 작성자: 이제형
// 소스명 Mygroup.js
// 페이지 용도: 개인별 목표 페이지 (나의 그룹 위젯)
// 생성 일자(수정 용도): 10/14
import SimpleSlider from "./Slide";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function Mygroup({ groupinfo }) {
  return (
    <div id="todo_my_group">
      <h1 className="todo_h1">나의 그룹</h1>
      <SimpleSlider groupinfo={groupinfo} />
    </div>
  );
}

export default Mygroup;
