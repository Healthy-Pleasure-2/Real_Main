// 작성자: 이제형
// 소스명 Todo.js
// 페이지 용도: 개인별 목표 페이지
// 생성 일자(수정 용도): 10/18 (JSON 파일 끌고오기)

import "./styles/Todo.css";
import axios from "axios";
import LeftContents from "../components/Todo/Leftcontents";
import GoalSet from "../components/Todo/GoalSet";
import Mygroup from "../components/Todo/Mygroup";
import { useEffect, useState } from "react";

function Todo({ sessiondata }) {
  console.log(sessiondata);
  const [groupinfo, setGroupInfo] = useState([]);
  useEffect(() => {
    axios
      .get("/group.json")
      .then((result) => {
        setGroupInfo(result.data);
      })
      .catch((error) => {
        console.error("데이터를 가져오지 못함", error);
      });
  }, []);

  return (
    <div id="todo_container">
      <LeftContents />
      <div id="todo_right_contents">
        <GoalSet sessiondata={sessiondata} />
        <Mygroup groupinfo={groupinfo} />
      </div>
    </div>
  );
}
export default Todo;
