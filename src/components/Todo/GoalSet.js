// 작성자: 이제형 
// 소스명 GoalSet.js
// 페이지 용도: 개인별 목표 페이지 (목표 설정 위젯)
// 생성 일자(수정 용도): 10/20

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPerson,
  faDumbbell,
  faUtensils
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";


function GoalSet() {
  const [goal, setGoal] = useState({
    weight: "",
    exercise: "",
    diet: ""
  });

  // input 값의 변동이 일어날때 일어나는 함수(onchange 함수)
  const handleInputChange = (event) => {
    // input의 name과 value 값을 변수선언 
    const { name, value } = event.target;
    // 목표 업데이트 
    setGoal({ ...goal, [name]: value })
  }
  const handleGoalSet = () => {

    const userId = 'wpgud';
    fetch(`http://localhost:3003/user/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(goal),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setGoal(goal)
      })
      .catch((error) => {
        console.error('서버 요청 오류: ', error)
      })
  }
  return (
    <div id="todo_goal">
      <h1 className="todo_h1">목표 설정</h1>
      <div id="todo_data_container">
        {/* 체중 */}
        <div className="todo_health">
          <div className="todo_data_leftSide">
            <div className="todo_icon"><FontAwesomeIcon icon={faPerson} /></div>
            <div>체중</div>
          </div>
          <div className="todo_data_rightSide">
            <input type="text" name="weight" className="todo_data_record" value={goal.weight} onChange={handleInputChange} />
            <span className="todo_unit">kg</span>
          </div>
        </div>
        {/* 운동 */}
        <div className="todo_health">
          <div className="todo_data_leftSide">
            <div className="todo_icon"><FontAwesomeIcon icon={faDumbbell} /></div>
            <div>운동</div>
          </div>
          <div className="todo_data_rightSide">
            <input type="text" name="exercise" className="todo_data_record" value={goal.exercise} onChange={handleInputChange} />
            <span className="todo_unit">kcal</span>
          </div>
        </div>
        {/* 식단 */}
        <div className="todo_health">
          <div className="todo_data_leftSide">
            <div className="todo_icon"><FontAwesomeIcon icon={faUtensils} /></div>
            <div>식단</div>
          </div>
          <div className="todo_data_rightSide">
            <input type="text" name="diet" className="todo_data_record" value={goal.diet} onChange={handleInputChange} />
            <span className="todo_unit">kcal</span>
          </div>
        </div>
      </div>
      {/* 완료버튼 */}
      <button className="todo_complete" onClick={handleGoalSet}>완료</button>
    </div>
  )
}

export default GoalSet; 