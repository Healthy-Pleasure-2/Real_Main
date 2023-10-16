// 소스명 : GroupPage.js
// 작성자 : 이진경
// 이 페이지 용도 : 그룹 페이지
// 생성일자(수정일자) : 23.10.13
// 수정 내용: 별도 컴포넌트가 아닌 해당 파일에서 해결,,,,

import React, { useState } from "react";
import "./styles/GroupPage.css";

function GroupPage() {
  // 버튼 클릭시 댓글창 보이기
  const [showDiv, setShowDiv] = useState(false);
  const toggleDiv = () => {
    setShowDiv(!showDiv);
  };

  // 댓글입력 및 삭제
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ author: "", text: "" });

  const addComment = () => {
    if (newComment.author && newComment.text) {
      setComments([...comments, { ...newComment, id: Date.now() }]);
      setNewComment({ author: "", text: "" });
    }
  };

  const deleteComment = (id) => {
    const updatedComments = comments.filter((comment) => comment.id !== id);
    setComments(updatedComments);
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

            {/* 댓글 리스트 */}
            <div className="commentList">
              {comments.map((comment) => (
                <div key={comment.id} className="commentIndex">
                  <h4>{comment.author}</h4>
                  <p>{comment.text}</p>
                  <button
                    className="delete"
                    onClick={() => deleteComment(comment.id)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>

            {/* 댓글 작성란 */}
            <div className="commentInput">
              <input
                type="text"
                maxlength="4"
                placeholder="닉네임"
                value={newComment.author}
                onChange={(e) =>
                  setNewComment({ ...newComment, author: e.target.value })
                }
              />
              <input
                type="text"
                maxlength="100"
                placeholder="댓글달기"
                value={newComment.text}
                onChange={(e) =>
                  setNewComment({ ...newComment, text: e.target.value })
                }
              />
              <button onClick={addComment}>게시</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GroupPage;
