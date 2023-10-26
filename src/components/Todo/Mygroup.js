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
      <div className="todo_my_group">
        <div className="todo_title">
          <h2>MY GROUP</h2>
          <p>현재 상태값을 입력하여 설정한 목표의 달성률을 확인하세요!</p>
        </div>

        <SimpleSlider groupdata={groupinfo} />
      </div>
    </div>
  );
}

export default Mygroup;
