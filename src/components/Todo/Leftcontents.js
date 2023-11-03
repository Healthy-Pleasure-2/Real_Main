// 작성자: 이제형
// 소스명 Leftcontents.js
// 페이지 용도: 개인별 목표 페이지 (to do list 작성 위젯)
// 생성 일자(수정 용도): 10/14

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import ReactCalendar from "./Calendar";
function LeftContents({ sessiondata }) {
  const [date, dateChange] = useState(new Date());
  // 날짜 형식 예시: 231010
  const fullDate =
    `${date.getFullYear()}` + `${date.getMonth() + 1}` + `${date.getDate()}`;
  // input 값
  const [text, setText] = useState("");
  // text가 추가되는 todolist 배열
  const [todoList, setTodoList] = useState([]);
  // db.json에서 todo 테이블에서 불러오는 값
  const [data, setData] = useState(null);
  // 완료, 미완료 표시
  const [done, setDone] = useState(false);
  // 로그인된 유저의 아이디
  const userId = sessiondata;
  //console.log(userId);
  // 화면 로딩 및 날짜가 변할때마다 db.json todo 테이블 불러오기
  useEffect(() => {
    if (sessiondata === false) {
      console.log("로그인을 부탁드립니다.");
    } else {
      setTodoList([]);
      fetch(`http://localhost:3003/todo/${userId}?date=${fullDate}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "해당 날짜에 데이터를 찾았습니다.") {
            // 성공적으로 응답을 처리하고 상태를 업데이트
            console.log("데이터 불러오기 성공", data.contents);
            const contentsArray = data.contents;
            // contentsArray 내의 내용을 todoList에 추가
            //setTodoList([...todoList, { id: sessiondata, text, done, fullDate }]);
            // 현재 todoList에 새로운 항목 추가
            contentsArray.forEach((contentItem) => {
              const { content, complete } = contentItem;
              const id = sessiondata; // 세션 데이터나 다른 ID 값을 설정하세요
              const text = content; // content 값을 text로 설정
              const done = complete;

              // 현재 todoList에 새로운 항목 추가
              setTodoList((prevTodoList) => [
                ...prevTodoList,
                { id, text, done, fullDate },
              ]);
            });

            setData(data.matchingDate);
            //console.log(responseData);
            //console.log("데이터 불러오기 성공");
          } else if (data.message === "해당 날짜를 찾지 못했습니다.") {
            setTodoList([]);
          }
        })
        .catch((error) => {
          // 에러 처리
          console.error("에러:", error);
        });
    }
    //}
  }, [fullDate, userId, sessiondata]);

  //db.json 파일 불러오기
  // todolist에 들어갈 데이터
  // const toDo = { "Id": `${userId}`, "date": `${fullDate}`, "contents": [{ "content": text, "complete": done }] }
  const dataToSubmit = {
    toDo: {
      date: fullDate,
      contents: [{ content: text, complete: done }],
    },
    userId: userId,
  };

  // todolist json 서버에 저장
  const submitInput = () => {
    //console.log(data.length);
    // json 서버의 todo 테이블이 빈값이면 값 post
    fetch("http://localhost:3003/todo", {
      // 요청방법
      method: "POST",
      // 전송할 데이터
      body: JSON.stringify(dataToSubmit),
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.ok) {
          // 성공적으로 업데이트된 경우에 할 일 목록을 업데이트
          setTodoList([...todoList, { id: sessiondata, text, done, fullDate }]);
        } else {
          console.error("데이터 업데이트 실패");
        }
      })
      .catch((error) => {
        console.error("에러:", error);
      });
    setText("");
  };
  //console.log(todoList);

  // todo list input 값 저장 함수
  const changeInput = (e) => {
    setText(e.target.value);
  };

  // to do list 삭제
  const remove = (item) => {
    console.log(item);
    // filter 함수 이용해서 item.id와 일치하는 값 제외하고 화면 출력
    fetch(`http://localhost:3003/todo/delete/contents`, {
      method: "PATCH",
      body: JSON.stringify(item),
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.ok) {
          setTodoList(
            todoList.filter((todo) => {
              return item.text !== todo.text;
            })
          );
        } else {
          console.error("데이터 업데이트 실패");
        }
      })
      .catch((error) => {
        console.error("에러:", error);
      });
  };

  // to do list 완료
  const complete = (item) => {
    console.log(item);
    // todolist 값 업데이트
    setDone(!done);
    fetch(`http://localhost:3003/todo/complete/contents`, {
      // 요청방법
      method: "PATCH",
      // 전송할 데이터
      body: JSON.stringify(item),
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.ok) {
          // 클릭한 텍스트와 기존의 todolist를 비교하여서 클릭한 todolist 항목을 추출
          // 해당 항목을 찾으면 전개연산자를 사용하여 기존 항목에 클릭한 항목의 done 값을 반대로 변경
          // 클릭 항목과 같은 텍스트값 못찾으면 그대로 todolist 유지
          const updatedTodoList = todoList.map((element) => {
            if (element.text === item.text) {
              return { ...element, done: !element.done };
            } else {
              return element;
            }
          });
          setTodoList(updatedTodoList);
        } else {
          console.error("데이터 업데이트 실패");
        }
      })
      .catch((error) => {
        console.error("에러:", error);
      });
  };
  //console.log("todo값", todoList);
  return (
    <div id="todo_left_contents">
      <div className="todo_title">
        <h2>To do List</h2>
        <p>오늘의 할 일을 리스트에 작성하여 완료해보세요!</p>
      </div>

      <ReactCalendar date={date} dateChange={dateChange} />

      <div className="todo_checkLists">
        {todoList.map((item, i) => {
          {
            //console.log("아이템값", item);
          }
          return (
            <>
              <div
                key={item.id}
                className="todo_checkList"
                style={{ background: item.done ? "#A7C957" : "#F3F5EF" }}
              >
                <button
                  className="todo_checked"
                  style={{ background: item.done ? "#386641" : "#a2a1a1" }}
                  onClick={() => {
                    complete(item);
                  }}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </button>
                <p
                  className={`${item.done ? "done" : ""}`}
                  style={{ color: item.done ? "#fff" : "#386641" }}
                >
                  {item.text}
                </p>
                <button
                  className="todo_delete"
                  style={{ background: item.checked ? "#a2a1a1" : "#f84949" }}
                  onClick={() => {
                    remove(item);
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
