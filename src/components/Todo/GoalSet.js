/*
-소스명 : Goal_Set.js
-작성자 : 이제형
-이 페이지 용도 : 개인별 목표 페이지 (목표 설정 위젯)
-생성일자(수정일자) : 231020
--------------------------------------------------------------------------------------------------------------
-로그
231020 이제형 - 최초생성 및 수정
231031 김장훈 - 시작 시 목표값 받아오는 기능 추가
--------------------------------------------------------------------------------------------------------------
*/

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPerson,
  faDumbbell,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

function GoalSet({ sessiondata }) {
  const [weight, setWeight] = useState("0");
  const [exercise, setExercise] = useState("0");
  const [diet, setDiet] = useState("0");

  const [GoalWeight, setGoalWeight] = useState("");
  const [GoalExercise, setGoalExercise] = useState("");
  const [GoalDiet, setGoalDiet] = useState("");

  // 클라이언트에서 사용자 정보 가져오기
  const fetchUserData = (userid) => {
    fetch(`http://localhost:3003/user_Goal/${userid}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("네트워크 에러");
      })
      .then((userData) => {
        const { name, weight, exercise, diet } = userData;
        setGoalWeight(weight);
        setGoalExercise(exercise);
        setGoalDiet(diet);
        console.log(weight);
        console.log(exercise);
        console.log(diet);
      })
      .catch((error) => {
        console.error("에러:", error);
      });
  };

  // 초기 실행 시 필요
  useEffect(() => {
    fetchUserData(sessiondata);
  }, [sessiondata]);

  const [goal, setGoal] = useState({
    weight: "", // weight 값을 초기값으로 설정
    exercise: "", // exercise 값을 초기값으로 설정
    diet: "", // diet 값을 초기값으로 설정
  });

  // input 값의 변동이 일어날때 일어나는 함수(onchange 함수)
  const handleInputChange = (event) => {
    // input의 name과 value 값을 변수 선언
    const { name, value } = event.target;
    // 목표 업데이트
    setGoal({ ...goal, [name]: value });
  };

  const handleGoalSet = () => {
    const userId = sessiondata;
    fetch(`http://localhost:3003/user/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(goal),
    })
      .then((response) => response.json())
      .then((data) => {
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
          <h2>목표 설정</h2>
          <p>체중, 운동량, 식사량에 대한 목표값을 작성해주세요.</p>
        </div>
        <div id="todo_data_container">
          {/* 체중 */}
          <div className="todo_health">
            <div className="todo_data_leftSide">
              <div className="todo_icon todo_weight"></div>
            </div>
            <div className="todo_data_rightSide">
              <input
                type="text"
                className="todo_data_record"
                name="weight"
                placeholder={GoalWeight}
                value={goal.weight}
                onChange={handleInputChange}
              />
              <div className="todo_unit">kg</div>
            </div>
          </div>
          {/* 운동 */}
          <div className="todo_health">
            <div className="todo_data_leftSide">
              <div className="todo_icon todo_exercise"></div>
            </div>
            <div className="todo_data_rightSide">
              <input
                type="text"
                className="todo_data_record"
                name="exercise"
                placeholder={GoalExercise}
                value={goal.exercise}
                onChange={handleInputChange}
              />
              <div className="todo_unit">kcal</div>
            </div>
          </div>
          {/* 식단 */}
          <div className="todo_health">
            <div className="todo_data_leftSide">
              <div className="todo_icon todo_diet"></div>
            </div>
            <div className="todo_data_rightSide">
              <input
                type="text"
                className="todo_data_record"
                name="diet"
                placeholder={GoalDiet}
                value={goal.diet}
                onChange={handleInputChange}
              />
              <div className="todo_unit">kcal</div>
            </div>
          </div>
        </div>
        {/* 완료 버튼 */}
        <div className="todo_complete">
          <button onClick={handleGoalSet}>완료</button>
        </div>
      </div>
    </div>
  );
}

export default GoalSet;
