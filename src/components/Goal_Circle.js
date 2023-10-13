import React from "react";
import "./Goal_Circle.css";

// *참고 사이트
// 1. https://medium.com/@pppped/how-to-code-a-responsive-circular-percentage-chart-with-svg-and-css-3632f8cd7705 = 개념
// 2. https://codepen.io/sergiopedercini/pen/jmKdbj = 여기 코드 기반으로 시작함.
// 3. https://blog.naver.com/rdh6327/222587794846 = 참고용
// --------------------------------------------------------------------------------------------------------------
// *23.10.11 HTML 샘플 완성. 좀 더 개선이 필요함. 차후 DB연결 시 개선 예정.
// *23.10.13 컴포넌트 완료

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
