// 작성자: 이제형 
// 소스명 todo.js
// 페이지 용도: 
// 생성 일자(수정 용도): 10/14
// 

import React, { useState, useEffect } from "react";
import './styles/Todo.css'
// import ReactCalendar from "./Calendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPerson,
  faCheck,
  faX,
  faDumbbell,
  faUtensils
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";


function Todo() {
  let [data, setData] = useState([]);
  let [todo, setTodo] = useState([]);
  useEffect(() => {
    axios.get('/data.json').then((result) => {
      console.log(result.data);
      setData(result.data);
    })
      .catch(error => {
        console.error('데이터 가져오기 실패', error)
      })
  }, [])
  return (
    <div id="container">
      <div id="left_contents">
        <h1>To do List</h1>
        <div className="calendar"></div>
        <div className="checkLists">
          <div className="checkList">
            <button className="checked"><FontAwesomeIcon icon={faCheck} /></button>
            <p>물 1리터 마시기</p>
            <button className="delete"><FontAwesomeIcon icon={faX} /></button>
          </div>
        </div>
        <div className="addList">
          <input type="text" />
          <button type="submit" className="save" onClick={(e) => {
            let copy = [...todo];
            copy.push(e.target.value);
            console.log(e.target.value)
            setTodo(copy);
            console.log(copy);
          }}>+</button>
        </div>
      </div>
      <div id="right_contents">
        <div id="goal">
          <h1>목표 설정</h1>
          <div className="weight">
            <div className="data_leftSide">
              <div className="icon"><FontAwesomeIcon icon={faPerson} /></div>
              <div>체중</div>
            </div>
            <div className="data_rightSide">
              <div id="data_record"><span>68</span>kg</div>
            </div>
          </div>
          <div className="exercise">
            <div className="data_leftSide">
              <div className="icon"><FontAwesomeIcon icon={faDumbbell} /></div>
              <div>운동</div>
            </div>
            <div className="data_rightSide">
              <div id="data_record"><span>68</span>kcal</div>
            </div>
          </div>
          <div className="eating">
            <div className="data_leftSide">
              <div className="icon"><FontAwesomeIcon icon={faUtensils} /></div>
              <div>식단</div>
            </div>
            <div className="data_rightSide">
              <div id="data_record"><span>68</span>kcal</div>
            </div>
          </div>
        </div>
        <div id="my_group">
          <h1>나의 그룹</h1>
          <div className="group_container">
          </div>
          <div className="btns">
            <button></button>
            <button></button>
            <button></button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Todo;
