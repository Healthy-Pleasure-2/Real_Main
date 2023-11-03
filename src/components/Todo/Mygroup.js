import SimpleSlider from "./Slide";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Mygroup({ sessiondata }) {
  return (
    <div id="todo_my_group">
      <div className="todo_my_group">
        <div className="todo_title">
          <h2>나의 그룹</h2>
          <p>
            함께할 때, 더 많이 이룰 수 있어요. 그룹에서 힘을 모아 함께
            활동해보세요!💪
          </p>
        </div>

        <SimpleSlider sessiondata={sessiondata} />
      </div>
    </div>
  );
}

export default Mygroup;
