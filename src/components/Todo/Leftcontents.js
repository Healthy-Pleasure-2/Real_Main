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
  const fullDate = `${date.getFullYear()}` + `${date.getMonth() + 1}` + `${date.getDate()}`
  // input 값 
  const [text, setText] = useState("");
  // 추가되는 todolist 배열 
  const [todoList, setTodoList] = useState([]);
  // db.json에서 todo 테이블에서 불러오는 값 
  const [data, setData] = useState(null);
  // 완료, 미완료 표시 
  const [done, setDone] = useState(false);

  // 화면 로딩 및 날짜가 변할때마다 db.json todo 테이블 불러오기 
  useEffect(() => {
    fetchData()
  }, [fullDate, text])

  //db.json 파일 불러오기 
  const fetchData = () => {
    fetch("http://localhost:3003/todo")
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        throw new Error("네트워크 에러");
      }).then((responseData) => {
        // 성공적으로 응답을 처리하고 상태를 업데이트
        setData(responseData);
        console.log("데이터 불러오기 성공")
      })
      .catch((error) => {
        // 에러 처리
        console.error("에러:", error);
      });
  }
  // todolist에 들어갈 데이터 
  const toDo = { "id": sessiondata, "date": `${fullDate}`, "content": [text], "done": done }

  // todolist 추가 
  const submitInput = () => {
    console.log(data.length)
    if (data.length === 0) {
      fetch("http://localhost:3003/todo", {
        // 요청방법
        method: "POST",
        // 전송할 데이터 
        body: JSON.stringify(toDo),
        headers: {
          "content-type": "application/json; charset=UTF-8"
        }
      })
    } else if (data.length !== 0) {
      console.log(data)
      console.log(fullDate)
      // 선택한 날짜와 같은 배열이 있는지 확인 
      let result = data.filter((item) => {
        return item.date === fullDate
      })
      console.log(result.length);

      // 해당날짜와 같은 배열이 없는 경우 fetch를 통해 데이터 새롭게 추가
      if (result.length === 0) {
        fetch("http://localhost:3003/todo", {
          // 요청방법
          method: "POST",
          // 전송할 데이터 
          body: JSON.stringify(toDo),
          headers: {
            "content-type": "application/json; charset=UTF-8"
          }
        })
      } else {
        // result[0].content.push(text)
        // 해당날짜와 같은 배열이 있는 경우 해당 배열의 content만 push하고 수정해서 업데이트(server.js에서 해야할듯)
        console.log({ ...result, content: [text] });
        fetch(`http://localhost:3003/todo/${fullDate}`, {
          // 요청방법
          method: "PATCH",
          // 전송할 데이터 
          body: JSON.stringify({ content: [text] }),
          headers: {
            "content-type": "application/json; charset=UTF-8"
          }
        })
          .then((response) => {
            if (response.ok) {
              // 성공적으로 업데이트된 경우에 할 일 목록을 업데이트
              const updatedTodoList = [...result[0].content, text];
              setTodoList(updatedTodoList);
            } else {
              console.error("데이터 업데이트 실패");
            }
          })
          .catch((error) => {
            console.error("에러:", error);
          });
      }
    }
    setText('')
  }

  // todo list input 값 저장 함수
  const changeInput = (e) => {
    setText(e.target.value);
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
    setDone(true);
    setTodoList(newTodo);
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
              <div key={item.id} className="todo_checkList" style={{ background: item.checked ? '#A7C957' : '#F3F5EF' }}>
                <button
                  className="todo_checked"
                  style={{ background: item.checked ? '#386641' : '#a2a1a1' }}
                  onClick={() => {
                    complete(item.id);
                  }}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </button>
                <p className={`${item.checked ? "done" : ""}`} style={{ color: item.checked ? '#fff' : '#386641' }}>{item.text}</p>
                <button
                  className="todo_delete"
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
