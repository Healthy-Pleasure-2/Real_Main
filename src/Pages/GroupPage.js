// 소스명 : GroupPage.js
// 작성자 : 이진경
// 이 페이지 용도 : 그룹 페이지
// 생성일자 : 23.10.13
// 수정일자: 수정 내용 별도 컴포넌트가 아닌 해당 파일에서 해결
// 수정 일자: 23.10.17 / 정은정 / 그룹 연결

import React, { useState, useEffect } from "react";
import "./styles/GroupPage.css";
import { useParams } from "react-router-dom";
import getGroupData from "../components/Community/getGroupData";
import errorImage from "../asset/error.png";
import axios from "axios";

function GroupPage({ isLoggedIn, sessiondata }) {
  // 버튼 클릭시 댓글창 보이기
  const [showDiv, setShowDiv] = useState(false);
  const toggleDiv = () => {
    setShowDiv(!showDiv);
  };

  // 댓글입력 및 삭제
  const [comments, setComments] = useState([]);
  // const [newCommentAuthor, setNewCommentAuthor] = useState("");
  const [newCommentText, setNewCommentText] = useState("");
  const [nickName, setNickName] = useState("");

  const addComment = () => {
    if (newCommentText) {
      setComments([
        ...comments,
        { author: nickName, text: newCommentText, id: Date.now() },
      ]);
      setNickName("");
      setNewCommentText("");
    }
  };

  const deleteComment = (id) => {
    const updatedComments = comments.filter((comment) => comment.id !== id);
    setComments(updatedComments);
  };

  //-----------23.10.17 / 정은정 / 그룹연결--------
  const { groupID } = useParams();
  const [groupInfo, setGroupInfo] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const data = await getGroupData(); // getGroupData 함수로 그룹 데이터 가져오기
        const group = data.find((item) => item.id === parseInt(groupID, 10));
        if (group) {
          setGroupInfo(group);
          // 그룹 정보를 이용한 다른 로직 처리
        } else {
          setErrorMessage("그룹 데이터를 찾을 수 없습니다.");
        }
      } catch (error) {
        // 에러 핸들링
        setErrorMessage("그룹 데이터를 불러오는 중에 문제가 발생했습니다.");
        console.error(error);
      }
    };
    fetchGroupData();

    // 닉네임값 불러오기 작업
    if (sessiondata) {
      const userid = sessiondata;
      // 데이터를 비동기적으로 가져옵니다.
      axios
        .get(`http://localhost:3003/groupPage/${groupID}/${userid}`)
        .then((response) => {
          const responseData = response.data;
          // 데이터가 정상적으로 로드됨
          setNickName(responseData.nickname);
        })
        .catch((error) => {
          console.error("데이터를 가져오지 못함", error);
        });
    }
  }, [groupID, sessiondata]);

  return (
    <div id="GroupPage">
      {errorMessage ? (
        <div className="GroupPage-error">
          <div className="error-container">
            <img src={errorImage} alt="Error" />
            <h1>{errorMessage}</h1>
          </div>
        </div>
      ) : (
        <div id="frame">
          <div className="top">
            {isLoggedIn && (
              <button onClick={toggleDiv}>
                {showDiv ? "탈퇴하기" : "참여하기"}
              </button>
            )}
            <h2>{groupInfo.name}</h2>
            {!showDiv && <div id="goal">나의 달성률을 확인하세요!</div>}
            {showDiv && (
              <div id="goal">
                나의 목표 달성률 <span>95%</span>
              </div>
            )}
          </div>

          <div className="intro">
            <div className="goal">
              <div id="title1">목 표</div>
              <div className="content">{groupInfo.goal}</div>
            </div>
            <div className="groupIntro">
              <div id="title2">소 개</div>
              <div className="content">{groupInfo.groupintro}</div>
            </div>
          </div>

          {/* 댓글 기능 */}
          {!showDiv && (
            <div className="comment">
              <div className="commentTitle">소통해요</div>
              <div className="comment-error">
                <img src={errorImage} alt="Error" />
                <h3>해당 서비스는 커뮤니티 참여시 이용 가능합니다. </h3>
              </div>
            </div>
          )}

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
                <div>{nickName}</div>
                <input
                  type="text"
                  maxLength="100"
                  placeholder="댓글달기"
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                />
                <button onClick={addComment}>게시</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default GroupPage;
