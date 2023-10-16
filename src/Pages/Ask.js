/* 소스명 : Ask.js */
/* 작성자: 강수진 */
/* 이 페이지 용도 : 공지사항 페이지 */
/* 생성일자(수정일자) : 
  - 23.10.16: 생성_강수진 */

import React from "react";
import "./styles/Ask.css";

function Ask() {
  return (
    <div className="Ask">
      <div className="notice">
        <input type="radio" id="tab1" name="tab" checked></input>
        <label for="tab1">공지사항</label>
        <input type="radio" id="tab2" name="tab" checked></input>
        <label for="tab2">자주묻는질문</label>
        <input type="radio" id="tab3" name="tab" checked></input>
        <label for="tab3">온라인 문의</label>
      </div>
      <div id="notice_N" className="tabcontent">
        <p>____검색</p>
        <p>작성</p>

      </div>
      <div id="notice_ask" className="tabcontent">
        <p>자주묻는 질문</p>
      </div>
      <div id="notice_inquiry" className="tabcontent">
          <p>이메일</p>
          <p>이름</p>
          <p>휴대전화번호(선택)</p>
          <p>제목</p>
          <p>문의사항</p>
      </div>
    </div>
  );
}
export default Ask;
