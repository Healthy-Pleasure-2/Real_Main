// 작성자: 이제형 
// 소스명 GoalSet.js
// 페이지 용도: 개인별 목표 페이지 (목표 설정 위젯)
<<<<<<< HEAD
// 생성 일자(수정 용도): 10/14
=======
// 생성 일자(수정 용도): 10/20
>>>>>>> aeb559a2c24027bd715f52ba69dedf488b4efa09



import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPerson,
  faDumbbell,
  faUtensils
} from "@fortawesome/free-solid-svg-icons";


function GoalSet() {
  return (
    <div id="todo_goal">
      <h1 className="todo_h1">목표 설정</h1>
<<<<<<< HEAD
      <div className="todo_weight">
        <div className="todo_data_leftSide">
          <div className="todo_icon"><FontAwesomeIcon icon={faPerson} /></div>
          <div>체중</div>
        </div>
        <div className="todo_data_rightSide">
          <input type="text" className="todo_data_record" />
          <span>kg</span>
        </div>
      </div>
      <div className="todo_exercise">
        <div className="todo_data_leftSide">
          <div className="todo_icon"><FontAwesomeIcon icon={faDumbbell} /></div>
          <div>운동</div>
        </div>
        <div className="todo_data_rightSide">
          <input type="text" className="todo_data_record" />
          <span>kcal</span>
        </div>
      </div>
      <div className="todo_eating">
        <div className="todo_data_leftSide">
          <div className="todo_icon"><FontAwesomeIcon icon={faUtensils} /></div>
          <div>식단</div>
        </div>
        <div className="todo_data_rightSide">
          <input type="text" className="todo_data_record" />
          <span>kcal</span>
        </div>
      </div>
=======
      <div id="todo_data_container">
        {/* 체중 */}
        <div className="todo_health">
          <div className="todo_data_leftSide">
            <div className="todo_icon"><FontAwesomeIcon icon={faPerson} /></div>
            <div>체중</div>
          </div>
          <div className="todo_data_rightSide">
            <input type="text" className="todo_data_record" />
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
            <input type="text" className="todo_data_record" />
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
            <input type="text" className="todo_data_record" />
            <span className="todo_unit">kcal</span>
          </div>
        </div>
      </div>
      {/* 완료버튼 */}
>>>>>>> aeb559a2c24027bd715f52ba69dedf488b4efa09
      <button className="todo_complete">완료</button>
    </div>
  )
}

export default GoalSet; 