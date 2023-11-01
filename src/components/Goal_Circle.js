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
231029 김장훈 - 쿠키에서 사용자정보 불러오기 코드 작성중.
231030 김장훈 - 가져와지는 목표값 최대값으로 지정하는것 수정
231031 김장훈 - server.js 목표값 받아오는 기능 수정 (feat.은정)
--------------------------------------------------------------------------------------------------------------
*참고 사이트
1. https://medium.com/@pppped/how-to-code-a-responsive-circular-percentage-chart-with-svg-and-css-3632f8cd7705 = 개념
2. https://codepen.io/sergiopedercini/pen/jmKdbj = 여기 코드 기반으로 시작함.
3. https://blog.naver.com/rdh6327/222587794846 = 참고용
*/

import React, { useState, useEffect } from "react";
import "./Goal_Circle.css";

function Goal_Circle({ sessiondata }) {
  const [User_Name, setuserName] = useState("");
  //입력
  const [input_weight, setWeight] = useState("0");
  const [input_exercise, setExercise] = useState("0");
  const [input_diet, setDiet] = useState("0");
  //목표
  const [max_weight, setmaxWeight] = useState("0");
  const [max_exercise, setmaxExercise] = useState("0");
  const [max_diet, setmaxDiet] = useState("0");
  //StrokeDasharray 설정
  const [weightStrokeDasharray, setWeightStrokeDasharray] = useState("0");
  const [exerciseStrokeDasharray, setExerciseStrokeDasharray] = useState("0");
  const [dietStrokeDasharray, setDietStrokeDasharray] = useState("0");

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
        setuserName(name);
        setmaxWeight(weight);
        setmaxExercise(exercise);
        setmaxDiet(diet);
      })
      .catch((error) => {
        console.error("에러:", error);
      });
  };
  //초기 실행 시 필요
  useEffect(() => {
    fetchUserData(sessiondata);
  }, [sessiondata]);

  //체중값 설정 및 계산
  const BaseValue_weight = (weightValue) => {
    const maxWeight = max_weight;
    const minWeight = 0;
    const maxWeightStrokeDasharray = 100;
    const minWeightStrokeDasharray = 0;

    return weightValue >= maxWeight
      ? maxWeightStrokeDasharray
      : weightValue <= minWeight
      ? minWeightStrokeDasharray
      : ((weightValue - minWeight) / (maxWeight - minWeight)) *
        maxWeightStrokeDasharray;
  };

  //운동값 설정 및 계산
  const BaseValue_exercise = (exerciseValue) => {
    const maxExercise = max_exercise;
    const minExercise = 0;
    const maxExerciseStrokeDasharray = 100;
    const minExerciseStrokeDasharray = 0;

    return exerciseValue >= maxExercise
      ? maxExerciseStrokeDasharray
      : exerciseValue <= minExercise
      ? minExerciseStrokeDasharray
      : ((exerciseValue - minExercise) / (maxExercise - minExercise)) *
        maxExerciseStrokeDasharray;
  };

  //식단값 설정 및 계산
  const BaseValue_diet = (dietValue) => {
    const maxDiet = max_diet;
    const minDiet = 0;
    const maxDietStrokeDasharray = 100;
    const minDietStrokeDasharray = 0;

    return dietValue >= maxDiet
      ? maxDietStrokeDasharray
      : dietValue <= minDiet
      ? minDietStrokeDasharray
      : ((dietValue - minDiet) / (maxDiet - minDiet)) * maxDietStrokeDasharray;
  };

  //사용자 입력값 시각화처리
  const handleInputChange = (inputType, inputValue) => {
    if (inputType === "input_weight") {
      setWeight(inputValue);
      setWeightStrokeDasharray(BaseValue_weight(parseFloat(inputValue)));
    } else if (inputType === "input_exercise") {
      setExercise(inputValue);
      setExerciseStrokeDasharray(BaseValue_exercise(parseFloat(inputValue)));
    } else if (inputType === "input_diet") {
      setDiet(inputValue);
      setDietStrokeDasharray(BaseValue_diet(parseFloat(inputValue)));
    }
  };

  return (
    <div className="flex-wrapper">
      <div className="title">안녕하세요! {User_Name}님 😊</div>

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

      <div className="subTitle">
        현재 체중, 운동량, 식사량을 입력하여 <br></br>
        <span>목표 달성률</span>을 확인하세요!
      </div>

      <div className="inputbox">
        <div className="input_inner">
          <div className="input_title">체중</div>
          <input
            className="inputbox1"
            type="text"
            placeholder="0"
            value={input_weight}
            onChange={(e) => handleInputChange("input_weight", e.target.value)}
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
            value={input_exercise}
            onChange={(e) =>
              handleInputChange("input_exercise", e.target.value)
            }
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
            value={input_diet}
            onChange={(e) => handleInputChange("input_diet", e.target.value)}
          />{" "}
          <br></br>
          kcal
        </div>
      </div>
    </div>
  );
}
export default Goal_Circle;
