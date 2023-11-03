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
  // if(date.getFullYear() < 10){
  //   return date.getFullYear + '0' 
  // }
  const fullDate = `${date.getFullYear()}` + `${date.getMonth() + 1}` + `${date.getDate()}`
  // input 값 
  const [text, setText] = useState("");
  // text가 추가되는 todolist 배열 
  const [todoList, setTodoList] = useState([]);
  // 완료, 미완료 표시
  const [done, setDone] = useState(false);
  // 로그인된 유저의 아이디 
  const userId = sessiondata;

  // 화면 로딩 및 날짜가 변할때마다 db.json todo 테이블 불러오기 
  // useEffect(() => {
  //   if (sessiondata === false) {
  //     console.log("로그인을 부탁드립니다.");
  //   } else {
  //     console.log("로그인 함");
  //     fetch(`http://localhost:3003/todo/${userId}?date=${fullDate}`)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         if (data.message === "해당 날짜에 데이터를 찾았습니다.") {
  //           // 성공적으로 응답을 처리하고 상태를 업데이트
  //           console.log("데이터 불러오기 성공", data.matchingDate);
  //         }
  //       })
  //       .catch((error) => {
  //         // 에러 처리
  //         console.error("에러:", error);
  //       });
  //   }
  //   //}
  // }, [fullDate, userId]);

  useEffect(() => {
    fetchTodoListByDate()
  }, [fullDate, userId])

  const fetchTodoListByDate = async () => {
    if (userId === false) {
      alert("로그인을 부탁드립니다")
    } else {
      console.log("로그인함")
    }
    fetch(`http://localhost:3003/todo/${userId}?date=${fullDate}`)
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        throw new Error("네트워크 에러");
      }).then((responseData) => {
        // 성공적으로 응답을 처리하고 상태를 업데이트
        setTodoList(responseData);
        console.log(responseData)
        console.log("데이터 불러오기 성공")
      })
      .catch((error) => {
        // 에러 처리
        console.error("에러:", error);
      });
  };

  //todolist에 들어갈 데이터 
  const dataToSubmit = {
    toDo: {
      date: fullDate,
      contents: [{ content: text, complete: done }]
    },
    userId: userId
  };

  // todolist json 서버에 저장 
  const submitInput = () => {
    // json 서버의 todo 테이블이 빈값이면 값 post 
    fetch("http://localhost:3003/todo", {
      // 요청방법
      method: "POST",
      // 전송할 데이터 
      body: JSON.stringify(dataToSubmit),
      headers: {
        "content-type": "application/json; charset=UTF-8"
      }
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
      })
    setText('')
  };

  // todo list input 값 저장 함수
  const changeInput = (e) => {
    setText(e.target.value);
  };

  // to do list 삭제
  const remove = (item) => {
    // filter 함수 이용해서 item.id와 일치하는 값 제외하고 화면 출력
    fetch(`http://localhost:3003/todo/delete/contents`, {
      method: "PATCH",
      body: JSON.stringify(item),
      headers: {
        "content-type": "application/json; charset=UTF-8"
      }
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
        "content-type": "application/json; charset=UTF-8"
      }
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
          setTodoList(updatedTodoList)
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
        <p>오늘의 할 일을 기록해보세요!</p>
      </div>
      <ReactCalendar date={date} dateChange={dateChange} />
      <div className="todo_checkLists">
        {todoList.map((item, i) => {
          return (
            <>
              <div key={item.id} className="todo_checkList" style={{ background: item.done ? '#A7C957' : '#F3F5EF' }}>
                <button
                  className="todo_checked"
                  style={{ background: item.done ? '#386641' : '#a2a1a1' }}
                  onClick={() => {
                    complete(item);
                  }}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </button>
                <p className={`${item.done ? "done" : ""}`} style={{ color: item.done ? '#fff' : '#386641' }}>{item.text}</p>
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
