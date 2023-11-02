// 작성자: 이제형
// 소스명 Leftcontents.js
// 페이지 용도: 개인별 목표 페이지 (to do list 작성 위젯)
// 생성 일자(수정 용도): 10/14

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import Calendar from "react-calendar";
import ReactCalendar from "./Calendar";
import styled from "styled-components";
// import ReactCalendar from "./Calendar";

function LeftContents() {
  let [text, setText] = useState("");
  let [todoList, setTodoList] = useState([]);

  // todo list input 값 저장 함수
  const changeInput = (e) => {
    setText(e.target.value);
  };

  // todo list 추가 함수
  const submitInput = (e) => {
    // todolist에 값 추가하는 방법
    const newTodoList = [...todoList].concat({
      id: todoList.length,
      text,
      checked: false,
    });
    // submit의 default 동작인 페이지 새로고침 막아주는 역할
    e.preventDefault();
    // todolist 배열값 업데이트
    setTodoList(newTodoList);
    //+ 버튼 누른후 todo list 추가되면 input 값 비워주기
    setText("");
  };

  // to do list 삭제
  const remove = (id) => {
    // filter 함수 이용해서 item.id와 일치하는 값 제외하고 화면 출력
    setTodoList(
      todoList.filter((item) => {
        return item.id !== id;
      })
    );
  };

  // to do list 완료
  const complete = (id) => {
    let newTodo = todoList.map((item) => {
      // 클릭한 요소 찾으면 ... 전개 연산자 활용하여 item.checked의 값을 true로 수정
      return item.id === id ? { ...item, checked: !item.checked } : item;
    });
    // todolist 값 업데이트
    setTodoList(newTodo);
  };

  return (
    <div id="todo_left_contents">
      <div className="todo_title">
        <h2>To do List</h2>
        <p>오늘의 할 일을 리스트에 작성하여 완료해보세요!</p>
      </div>

      <ReactCalendar />

      <div className="todo_checkLists">
        {todoList.map((item, i) => {
          console.log(todoList);
          return (
            <>
              <div
                className="todo_checkList"
                style={{ background: item.checked ? "#A7C957" : "#F3F5EF" }}
              >
                <button
                  className="todo_checked"
                  style={{ background: item.checked ? "#386641" : "#a2a1a1" }}
                  onClick={() => {
                    complete(item.id);
                  }}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </button>
                <p
                  className={`${item.checked ? "done" : ""}`}
                  style={{ color: item.checked ? "#fff" : "#386641" }}
                >
                  {item.text}
                </p>
                <button
                  className="todo_delete"
                  style={{ background: item.checked ? "#a2a1a1" : "#f84949" }}
                  onClick={() => {
                    remove(item.id);
                  }}
                >
                  <FontAwesomeIcon icon={faX} />
                </button>
              </div>
            </>
          );
        })}
      </div>
      <div className="todo_addList">
        <input
          type="text"
          className="todo_todoAdd"
          placeholder="오늘의 할일을 입력하세요."
          value={text}
          onChange={changeInput}
        />
        <button type="submit" className="todo_save" onClick={submitInput}>
          +
        </button>
      </div>
    </div>
  );
}

export default LeftContents;
