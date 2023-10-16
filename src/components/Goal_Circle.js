/*
-소스명 : Goal_Circle.js
-작성자 : 김장훈
-이 페이지 용도 : 페이지 우측 원형 시각화, Goal_Circle.js
-생성일자(수정일자) : 231011 최초 HTML로 생성, 231013 캄포넌트 완료
--------------------------------------------------------------------------------------------------------------
-로그
231013 김장훈 - 차후 DB연결 시 개선 예정.
231016 김장훈 - 수정중
--------------------------------------------------------------------------------------------------------------
*참고 사이트
1. https://medium.com/@pppped/how-to-code-a-responsive-circular-percentage-chart-with-svg-and-css-3632f8cd7705 = 개념
2. https://codepen.io/sergiopedercini/pen/jmKdbj = 여기 코드 기반으로 시작함.
3. https://blog.naver.com/rdh6327/222587794846 = 참고용
*/

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
export default Goal_Circle;
*/



import React, {useState} from "react";
import "./Goal_Circle.css";

function Goal_Circle() {
    const [weight, setWeight] = useState(""); // 체중 입력을 위한 상태

    // 입력 버튼을 눌렀을 때 처리하는 함수
    const handleInput = () => {
        // 입력된 체중을 사용하여 원형 시각화를 업데이트할 수 있음
        console.log("체중: " + weight + "kg");
    };

    const BaseValue = (weightValue) => {
        const maxWeight = 100; // 최대 체중
        const minWeight = 0; // 최소 체중
        const maxStrokeDasharray = 100; // 최대 strokeDasharray
        const minStrokeDasharray = 0; // 최소 strokeDasharray

        // weightValue가 maxWeight보다 크면 maxStrokeDasharray를 반환, weightValue가 minWeight보다
        // 작으면 minStrokeDasharray를 반환 그 외의 경우, weightValue를 maxWeight에서 minWeight로 매핑하여
        // strokeDasharray를 계산
        return weightValue >= maxWeight
            ? maxStrokeDasharray
            : weightValue <= minWeight
                ? minStrokeDasharray
                : ((weightValue - minWeight) / (maxWeight - minWeight)) * maxStrokeDasharray;
    };

    const weightValue = parseFloat(weight); // 문자열을 숫자로 변환

    return (
        <div className="flex-wrapper">
            <div className="single-chart">
                <input type="text" placeholder="체중 입력" value={weight} onChange={(e) => setWeight(e.target.value)}/>
                <svg viewBox="0 0 36 36" className="circular-chart orange">
                    <text x="10.2" y="15" fontSize="2.5px" className="percentage"> 체중: {weight} kg</text>
                    <path className="circle" strokeDasharray={`${BaseValue(weightValue)}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                </svg>
            </div>
            <button onClick={handleInput}>입력</button>
        </div>
    );
}

export default Goal_Circle;