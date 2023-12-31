import React, { useState, useEffect } from "react";
import "./Goal_Circle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAnglesRight } from "@fortawesome/free-solid-svg-icons";

function Goal_Circle({ sessiondata }) {
  const [User_Name, setuserName] = useState("");
  //입력
  const [input_weight, setWeight] = useState("");
  const [input_exercise, setExercise] = useState("");
  const [input_diet, setDiet] = useState("");
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

  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`flip-card ${isFlipped ? "flipped" : ""}`}>
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <div className="title">
            안녕하세요 <br></br>
            <span>{User_Name}</span> 님
          </div>
          <div className="subTitle">
            데일리 체중, 운동량, 식사량을 입력하여 <br></br>
            <span>목표 달성률</span>을 확인하세요!
          </div>
          <div className="subTitle2">
            * 목표설정은 "개인별 목표설정" 에서 작성
          </div>
          <button className="flip-button" onClick={flipCard}>
            입력하기
            <FontAwesomeIcon icon={faAnglesRight} />
          </button>
        </div>

        <div className="flip-card-back">
          <div className="backTitle">현재 상태값</div>
          <div className="backSubTitle">목표 달성률을 확인해보세요!</div>
          <div className="single-chart">
            <svg viewBox="0 0 36 36" className="circular-chart orange">
              <text
                x="10.2"
                y="15"
                fontSize="2.5px"
                className="percentage"
              ></text>
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
              <text
                x="8.5"
                y="18.8"
                fontSize="3px"
                className="percentage1"
              ></text>
            </svg>
          </div>

          <div className="single-chart2">
            <svg viewBox="0 0 36 36" className="circular-chart2 blue">
              <path
                className="circle2"
                strokeDasharray={`${dietStrokeDasharray}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <text
                x="7"
                y="25"
                fontSize="3.5px"
                className="percentage2"
              ></text>
            </svg>
          </div>

          <div className="inputbox">
            <div className="input_inner">
              <div className="input_title">체중</div>
              <input
                className="inputbox1"
                type="text"
                placeholder="0"
                value={input_weight}
                onChange={(e) =>
                  handleInputChange("input_weight", e.target.value)
                }
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
                onChange={(e) =>
                  handleInputChange("input_diet", e.target.value)
                }
              />{" "}
              <br></br>
              kcal
            </div>
          </div>

          <button className="flip-button" onClick={flipCard}>
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Goal_Circle;
