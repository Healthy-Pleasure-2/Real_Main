import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import ReactCalendar from "./Calendar";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from 'uuid'

function LeftContents({ sessiondata }) {
  const [date, dateChange] = useState(new Date());
  let fullDate;
  // 날짜 형식 맞추기: ex) 230901
  if (date.getMonth() + 1 < 10 && date.getDate() < 10) {
    fullDate = `${date.getFullYear()}` + `${"0" + (date.getMonth() + 1)}` + `${"0" + date.getDate()}`;
  } else if (date.getMonth() + 1 < 10 && date.getDate() > 10) {
    fullDate = `${date.getFullYear()}` + `${"0" + (date.getMonth() + 1)}` + `${date.getDate()}`;
  } else if (date.getMonth() + 1 >= 10 && date.getDate() < 10) {
    fullDate = `${date.getFullYear()}` + `${date.getMonth() + 1}` + `${"0" + date.getDate()}`;
  } else {
    fullDate = `${date.getFullYear()}` + `${date.getMonth() + 1}` + `${date.getDate()}`;
  }

  // input 값 변경될때 마다 저장되는 저장소 
  const [text, setText] = useState("");
  // text가 추가되는 todolist 배열
  const [todoList, setTodoList] = useState([]);
  // 완료, 미완료 표시
  const [done, setDone] = useState(false);
  // 로그인된 유저의 아이디
  const userId = sessiondata;

  // 화면 로딩 및 날짜가 변할때마다 db.json todo 테이블 불러오기
  useEffect(() => {
    if (sessiondata === false) {
      return;
    } else {
      setTodoList([]);
      fetch(`http://localhost:3003/todo/${userId}?date=${fullDate}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "해당 날짜에 데이터를 찾았습니다.") {
            // 데이터 변수에 할당 
            const contentsArray = data.contents;

            const updatedTodoList = contentsArray.map((contentItem) => {
              const { content, complete } = contentItem;
              const id = sessiondata;
              const text = content; // content 값을 text로 설정
              const done = complete; // done 값을 complet 값으로 설정
              return { id, text, done, fullDate };
            });
            // 한 번에 Todo 리스트 업데이트
            setTodoList(updatedTodoList);
          } else if (data.message === "해당 날짜를 찾지 못했습니다.") {
            setTodoList([]);
          }
        })
        .catch((error) => {
          // 에러 처리
          console.error("에러:", error);
        });
    }
  }, [fullDate, sessiondata]);

  // 서버에 보낼 데이터 형식 
  const dataToSubmit = {
    toDo: {
      date: fullDate,
      contents: [{ content: text, complete: false }],
    },
    userId: userId,
  };

  // todolist json 서버에 저장
  const submitInput = (event) => {
    if (sessiondata === false) {
      Swal.fire({
        title: "로그인 상태가 아닙니다",
        text: "투두리스트 이용하기 위해서는 로그인 부탁드립니다.",
        icon: "error",
        confirmButtonColor: "#A7C957",
      });
      setText('')
    } else if (text === "") {
      event.preventDefault()
      Swal.fire({
        title: "값 오류",
        text: "값을 입력해주세요.",
        icon: "warning",
        confirmButtonColor: "#A7C957",
      });
    } else {
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
            setTodoList([...todoList, { id: sessiondata, text, done: false, fullDate }]);
          } else {
            console.error("데이터 업데이트 실패");
          }
        })
        .catch((error) => {
          console.error("에러:", error);
        });
      setText("");
    }
  };
  // todo list input 값 저장 함수
  const changeInput = (e) => {
    setText(e.target.value);
  };

  // to do list 삭제
  const remove = (item) => {
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

  return (
    <div id="todo_left_contents">
      <div className="todo_title">
        <h2>To do List</h2>
        <p>오늘의 할 일을 리스트에 작성하여 완료해보세요!</p>
      </div>
      <ReactCalendar date={date} dateChange={dateChange} />
      <div className="todo_checkLists">
        {todoList.map((item, i) => {
          return (
            <div
              key={uuidv4()}
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