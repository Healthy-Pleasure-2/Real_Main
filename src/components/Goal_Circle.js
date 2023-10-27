/*
-소스명 : Goal_Circle.js
-작성자 : 김장훈
-이 페이지 용도 : 페이지 우측 원형 시각화, Goal_Circle.js
-생성일자(수정일자) : 231011 최초 HTML로 생성, 231013 캄포넌트 완료
--------------------------------------------------------------------------------------------------------------
-로그
231013 김장훈 - 차후 DB연결 시 개선 예정.
231016 김장훈 - 수정중
231017 김장훈 - 입력창 및 입력버튼을 통한 시각화 변화하도록 수정. UI다듬기 등 추가작업 필요
231018 김장훈 - 입력버튼 삭제(input 박스에 입력되면 시각화 바로 변화되도록 수정), UI 다듬기, 차후 Todo 페이지에서 최대값 불러오기 추가예정 
231024 김장훈 - 
--------------------------------------------------------------------------------------------------------------
*참고 사이트
1. https://medium.com/@pppped/how-to-code-a-responsive-circular-percentage-chart-with-svg-and-css-3632f8cd7705 = 개념
2. https://codepen.io/sergiopedercini/pen/jmKdbj = 여기 코드 기반으로 시작함.
3. https://blog.naver.com/rdh6327/222587794846 = 참고용
*/

import React, { useState } from "react";
import "./Goal_Circle.css";

function Goal_Circle() {
  const [weight, setWeight] = useState("0");
  const [exercise, setExercise] = useState("0");
  const [diet, setDiet] = useState("0");
  const [weightStrokeDasharray, setWeightStrokeDasharray] = useState("0");
  const [exerciseStrokeDasharray, setExerciseStrokeDasharray] = useState("0");
  const [dietStrokeDasharray, setDietStrokeDasharray] = useState("0");

  const BaseValue = (weightValue) => {
    const maxWeight = 100;
    const minWeight = 0;
    const maxStrokeDasharray = 100;
    const minStrokeDasharray = 0;

    return weightValue >= maxWeight
      ? maxStrokeDasharray
      : weightValue <= minWeight
      ? minStrokeDasharray
      : ((weightValue - minWeight) / (maxWeight - minWeight)) *
        maxStrokeDasharray;
  };

  const handleInputChange = (inputType, inputValue) => {
    if (inputType === "weight") {
      setWeight(inputValue);
      setWeightStrokeDasharray(BaseValue(parseFloat(inputValue)));
    } else if (inputType === "exercise") {
      setExercise(inputValue);
      setExerciseStrokeDasharray(BaseValue(parseFloat(inputValue)));
    } else if (inputType === "diet") {
      setDiet(inputValue);
      setDietStrokeDasharray(BaseValue(parseFloat(inputValue)));
    }
  };

  return (
    <div className="flex-wrapper">
      <div className="title">안녕하세요! 김멀플님</div>
      <div className="single-chart">
        <svg viewBox="0 0 36 36" className="circular-chart orange">
          <text x="10.2" y="15" fontSize="2.5px" className="percentage"></text>
          <path
            className="circle"
            strokeDasharray={`${weightStrokeDasharray}, 100`}
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
      </div>

      <div className="single-chart1">
        <svg viewBox="0 0 36 36" className="circular-chart1 green">
          <path
            className="circle1"
            strokeDasharray={`${exerciseStrokeDasharray}, 100`}
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <text x="8.5" y="18.8" fontSize="3px" className="percentage1"></text>
        </svg>
      </div>

      <div className="single-chart2">
        <svg viewBox="0 0 36 36" className="circular-chart2 blue">
          <path
            className="circle2"
            strokeDasharray={`${dietStrokeDasharray}, 100`}
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <text x="7" y="25" fontSize="3.5px" className="percentage2"></text>
        </svg>
      </div>

      <div className="inputbox">
        <div className="input_inner">
          <div className="input_title">체중</div>
          <input
            className="inputbox1"
            type="text"
            placeholder="0"
            value={weight}
            onChange={(e) => handleInputChange("weight", e.target.value)}
          />
          <br></br>
          kg
        </div>
        <div className="input_inner">
          <div className="input_title">운동</div>
          <input
            className="inputbox2"
            type="text"
            placeholder="0"
            value={exercise}
            onChange={(e) => handleInputChange("exercise", e.target.value)}
          />{" "}
          <br></br>
          kcal
        </div>
        <div className="input_inner">
          <div className="input_title">식단</div>
          <input
            className="inputbox3"
            type="text"
            placeholder="0"
            value={diet}
            onChange={(e) => handleInputChange("diet", e.target.value)}
          />{" "}
          <br></br>
          kcal
        </div>
      </div>
    </div>
  );
}
export default Goal_Circle;



/*초안*/
/*
import React from "react";
import "./Goal_Circle.css";
function Goal_Circle() {
  return (
    <div className="flex-wrapper">
      <div className="single-chart">
        <svg viewBox="0 0 36 36" className="circular-chart orange">
          <path
            className="circle"
            strokeDasharray="90, 100"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <text x="10.2" y="15" fontSize="2.5px" className="percentage">
            체중:___kg
          </text>
        </svg>
      </div>
      <div className="single-chart1">
        <svg viewBox="0 0 36 36" className="circular-chart1 green">
          <path
            className="circle1"
            strokeDasharray="90, 100"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <text x="8.5" y="18.8" fontSize="3px" className="percentage1">
            운동:___kcal
          </text>
        </svg>
      </div>
      <div className="single-chart2">
        <svg viewBox="0 0 36 36" className="circular-chart2 blue">
          <path
            className="circle2"
            strokeDasharray="90, 100"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <text x="7" y="25" fontSize="3.5px" className="percentage2">
            식단:___kcal
          </text>
        </svg>
      </div>
    </div>
  );
}
export default Goal_Circle; */
