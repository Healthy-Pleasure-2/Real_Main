// 소스명 : GroupPage.js
// 작성자 : 이진경
// 이 페이지 용도 :
// 생성일자(수정일자) :
// 매일 파일 압축해서 들고 있기~! 주석달기~!

import React, { useState } from "react";
import "./styles/GroupPage.css";
import CommentList from "../components/GroupPage/CommentList";

function GroupPage() {
  // 버튼 클릭시 댓글창 보이기
  const [showDiv, setShowDiv] = useState(false);
  const toggleDiv = () => {
    setShowDiv(!showDiv);
  };

  // 댓글
  const [comments, setComments] = useState([]);

  const addComment = (comment) => {
    setComments([...comments, comment]);
  };

  return (
    <div id="GroupPage">
      <div id="frame">
        <div className="top">
          <button onClick={toggleDiv}>참여하기</button>
          <h2>그룹명이 들어올 자리입니다.</h2>
          <div id="category">카테고리</div>
        </div>

        <div className="intro">
          <div className="goal">
            <div id="title">목 표</div>
            <div className="content">
              해당 그룹 목표입니다. 해당 그룹 목표입니다.해당 그룹
              목표입니다.해당 그룹 목표입니다.해당 그룹 목표입니다.해당 그룹
              목표입니다.해당 그룹 목표입니다.
            </div>
          </div>
          <div className="groupIntro">
            <div id="title">소 개</div>
            <div className="content">
              해당 그룹 소개글 입니다.해당 그룹 소개글 입니다.해당 그룹 소개글
              입니다.해당 그룹 소개글 입니다.해당 그룹 소개글 입니다.해당 그룹
              소개글 입니다.해당 그룹 소개글 입니다.해당 그룹 소개글 입니다.해당
              그룹 소개글 입니다.해당 그룹 소개글 입니다.해당 그룹 소개글
              입니다.해당 그룹 소개글 입니다.해당 그룹 소개글 입니다..해당 그룹
              소개글 입니다.해당 그룹 소개글 입니다.해당 그룹 소개글 입니다.해당
              그룹 소개글 입니다
            </div>
          </div>
        </div>

        {/* 댓글 기능 */}
        {showDiv && (
          <div className="comment">
            <div className="commentTitle">소통해요</div>

            <div className="commentList">
              <CommentList comments={comments} />

              <form
                className="commentform"
                onSubmit={(e) => {
                  e.preventDefault();
                  const author = e.target.author.value;
                  const text = e.target.text.value;
                  addComment({ author, text });
                  e.target.reset();
                }}
              >
                <input type="text" name="author" placeholder="닉네임" />
                <input name="text" placeholder="댓글달기" />
                <button type="submit">게시</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GroupPage;

// 참고 사이트 https://codepen.io/nickmoreton/pen/wvXJLY
// https://blog.naver.com/sejun3278/221874776939
// https://onethejay.tistory.com/195 (게시글 등록)
//https://github.com/newsilver1028/react-study-5-weeks (원하는바와 비슷)
