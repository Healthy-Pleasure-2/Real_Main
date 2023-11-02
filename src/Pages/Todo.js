// 작성자: 이제형
// 소스명 Todo.js
// 페이지 용도: 개인별 목표 페이지
// 생성 일자(수정 용도): 10/18 (JSON 파일 끌고오기)

import "./styles/Todo.css";
import LeftContents from "../components/Todo/Leftcontents";
import GoalSet from "../components/Todo/GoalSet";
import Mygroup from "../components/Todo/Mygroup";

function Todo({ sessiondata }) {
  console.log(sessiondata);
  return (
    <div id="todo_container">
      <LeftContents sessiondata={sessiondata} />
      <div id="todo_right_contents">
        <GoalSet sessiondata={sessiondata} />
        <Mygroup sessiondata={sessiondata} />
      </div>
    </div>
  );
}
export default Todo;
