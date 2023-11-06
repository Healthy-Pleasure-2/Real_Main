import React, { useState, useEffect } from "react";
import "./styles/GroupPage.css";
import { useParams } from "react-router-dom";
import getGroupData from "../components/Community/getGroupData";
import errorImage from "../asset/error.png";
import Swal from "sweetalert2";

function GroupPage({ isLoggedIn, sessiondata }) {
  // 버튼 클릭시 댓글창 보이기
  const { groupID } = useParams();
  const [groupInfo, setGroupInfo] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [showDiv, setShowDiv] = useState(false);
  const [nickname, setNickname] = useState("");
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
      }
    };
    const groupjoin = () => {
      const userid = sessiondata;
      fetch(`http://localhost:3003/groupjoin/${userid}?groupId=${groupID}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setNickname(data.nickname);
          if (data.message === "true") {
            setShowDiv(true);
          } else {
            setShowDiv(false);
          }
        });
    };
    fetchGroupData();
    groupjoin();
  }, [groupID, sessiondata, showDiv]);
  const toggleDiv = async () => {
    const userid = sessiondata;
    try {
      await fetch(`http://localhost:3003/communicate/${userid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ groupId: groupID }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "true") {
            setShowDiv(true);
            Swal.fire({
              title: "참여완료",
              icon: "success",
              confirmButtonColor: "#A7C957",
            });
          } else if (data.message === "false") {
            setShowDiv(false);
            Swal.fire({
              title: "그룹 탈퇴",
              text: "탈퇴 하시겠습니까?",
              icon: "warning",
              confirmButtonColor: "#A7C957",
              confirmButtonText: "Yes",
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire({
                  title: "그룹탈퇴 완료",
                  text: "다음에 다시 만나요...",
                  icon: "success",
                  confirmButtonColor: "#A7C957",
                });
              }
            });
          }
        });
    } catch (error) {
      console.error("그룹 참여작업중오류 발생:", error);
    }
  };

  // 댓글입력 및 삭제
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ text: "" });

  const addComment = () => {
    if (newComment.text) {
      setComments([...comments, { ...newComment, id: Date.now() }]);
      setNewComment({ text: "" });
    }
  };

  const deleteComment = (id) => {
    const updatedComments = comments.filter((comment) => comment.id !== id);
    setComments(updatedComments);
  };

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
            {!showDiv && <div id="goal">그룹에 참여하여 함께해요!</div>}
            {showDiv && (
              <div id="goal">
                나의 목표 달성일: <span>1일</span>
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
                <h3>
                  해당 서비스는 커뮤니티 참여시 이용 가능합니다.<br></br>
                  <span>* 로그인 후 이용해주세요 😊 *</span>
                </h3>
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
                    <h4>{nickname}</h4>
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
                <input type="text" value={nickname} readOnly />
                <input
                  type="text"
                  maxLength="100"
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
      )}
    </div>
  );
//*****************10.28 그룹참여관련 코드 */
// 가정: 사용자가 버튼을 클릭하면 이벤트 핸들러가 호출되며, 그룹 번호를 전달할 수 있습니다.

// 예를 들어, 사용자가 선택한 그룹 번호를 가져와 변수에 저장
// const selectedGroupId = 123; // 이 부분은 사용자가 선택한 그룹 번호로 대체되어야 합니다.

// // 서버에 POST 요청 보내기 (이 코드는 예시이며, fetch, axios 등을 사용하여 요청을 보낼 수 있습니다)
// fetch('/joinGroup', {
//   method: 'POST',
//   headers: {
//     'Content-Type': '/json'
//   },
//   body: JSON.stringify({ groupId: selectedGroupId }) // 선택한 그룹 번호를 서버에 전달
// })
// .then(response => {
//   if (response.ok) {
//     // 서버로부터 응답이 성공적으로 돌아왔을 때의 동작
//     console.log('그룹 가입 성공');
//     // 추가로 필요한 동작을 수행할 수 있습니다.
//   } else {
//     // 서버에서 오류 응답이 돌아왔을 때의 처리
//     console.error('그룹 가입 실패');
//   }
// })
// .catch(error => {
//   // 네트워크 오류 등으로 요청을 보내지 못했을 때의 처리
//   console.error('오류 발생', error);
// });
}

export default GroupPage;
