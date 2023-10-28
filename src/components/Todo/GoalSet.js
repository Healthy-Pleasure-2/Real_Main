// 작성자: 이제형
// 소스명 GoalSet.js
// 페이지 용도: 개인별 목표 페이지 (목표 설정 위젯)
// 생성 일자(수정 용도): 10/20

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPerson,
  faDumbbell,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function GoalSet() {
  const [goal, setGoal] = useState({
    weight: "",
    exercise: "",
    diet: "",
  });

  // input 값의 변동이 일어날때 일어나는 함수(onchange 함수)
  const handleInputChange = (event) => {
    // input의 name과 value 값을 변수선언
    const { name, value } = event.target;
    // 목표 업데이트
    setGoal({ ...goal, [name]: value });
  };
  const handleGoalSet = () => {
    const userId = "wpgud";
    fetch(`http://localhost:3003/user/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(goal),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setGoal(goal);
      })
      .catch((error) => {
        console.error("서버 요청 오류: ", error);
      });
  };
  return (
    <div id="todo_goal">
      <div className="todo_goal">
        <div className="todo_title">
          <h2>DAILY</h2>
          <p>
            현재의 체중, 운동량, 식사량을 입력하여 설정한 목표의 달성률을
            확인하세요!
          </p>
        </div>
        <div id="todo_data_container">
          {/* 체중 */}
          <div className="todo_health">
            <div className="todo_data_leftSide">
              <div className="todo_icon todo_weight">
                {/* <FontAwesomeIcon icon={faPerson} /> */}
                <img src=""></img>
              </div>
              {/* <div>체중</div> */}
            </div>
            <div className="todo_data_rightSide">
              <input
                type="text"
                className="todo_data_record"
                name="weight"
                placeholder="0"
                value={goal.weight}
                onChange={handleInputChange}
              />
              <div className="todo_unit">kg</div>
            </div>
          </div>
          {/* 운동 */}
          <div className="todo_health">
            <div className="todo_data_leftSide">
              <div className="todo_icon todo_exercise">
                {/* <FontAwesomeIcon icon={faDumbbell} /> */}
              </div>
              {/* <div>운동</div> */}
            </div>
            <div className="todo_data_rightSide">
              <input
                type="text"
                className="todo_data_record"
                name="exercise"
                placeholder="0"
                value={goal.exercise}
                onChange={handleInputChange}
              />
              <div className="todo_unit">kcal</div>
            </div>
          </div>
          {/* 식단 */}
          <div className="todo_health">
            <div className="todo_data_leftSide">
              <div className="todo_icon todo_diet">
                {/* <FontAwesomeIcon icon={faUtensils} /> */}
              </div>
              {/* <div>식단</div> */}
            </div>
            <div className="todo_data_rightSide">
              <input
                type="text"
                className="todo_data_record"
                name="diet"
                placeholder="0"
                value={goal.diet}
                onChange={handleInputChange}
              />
              <div className="todo_unit">kcal</div>
            </div>
          </div>
        </div>
        {/* 완료버튼 */}
        <div className="todo_complete">
          <button onClick={handleGoalSet}>완료</button>
        </div>
      </div>
    </div>
  );
}

export default GoalSet;
