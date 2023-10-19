/* 소스명 : Ask.js */
/* 작성자: 강수진 */
/* 이 페이지 용도 : 공지사항 페이지 */
/* 생성일자(수정일자) : 
  - 23.10.16: 생성_강수진 */

import "./styles/Ask.css";
import Notice from "../components/notice";
import React, { Component } from "react";
// import dummy from "../../public/notice.json"

class Ask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "notice_N", // 초기 활성 탭 설정
      notices: [],
      message: "",
    };
  }

  handleTabClickl = () => {
    // 버튼이 클릭되면 "문의 완료되었습니다" 메시지를 상태에 저장
    this.setState({ message: "문의 완료되었습니다" });
  };

  // componentDidMount() {
  //   // JSON 파일 경로를 설정합니다.
  //   const jsonFilePath = '../public/notice.json'; // JSON 파일

  //   // JSON 데이터를 가져옵니다.
  //   fetch(jsonFilePath)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       this.setState({ notices: data });
  //     })
  //     .catch((error) => {
  //       console.error('JSON 데이터를 가져오는 중 오류가 발생했습니다: ', error);
  //     });
  // }

  handleTabClick = (tabId) => {
    this.setState({ activeTab: tabId });
  };

  render() {
    const { activeTab, notices } = this.state;
    const { message } = this.state;
    return (
      <div className="Ask">
        <div className="notice">
          <input
            type="radio"
            id="tab1"
            name="tab"
            checked={this.state.activeTab === "notice_N"}
            onChange={() => this.handleTabClick("notice_N")}
          />
          <label htmlFor="tab1">공지사항</label>
          <input
            type="radio"
            id="tab2"
            name="tab"
            checked={this.state.activeTab === "notice_ask"}
            onChange={() => this.handleTabClick("notice_ask")}
          />
          <label htmlFor="tab2">자주묻는질문</label>
          <input
            type="radio"
            id="tab3"
            name="tab"
            checked={this.state.activeTab === "notice_inquiry"}
            onChange={() => this.handleTabClick("notice_inquiry")}
          />
          <label htmlFor="tab3">온라인 문의</label>
        </div>
        <div
          id="notice_N"
          className={`tabcontent ${
            this.state.activeTab === "notice_N" ? "active" : ""
          }`}
        >
          <Notice />
          {/* JSON 데이터를 사용하여 공지사항을 표시합니다. */}
          {/* <ul>
              {notices.map((notice) => (
                <li key={notice.id}>
                  <h3>{notice.title}</h3>
                  <p>{notice.content}</p>
                  <p>Date: {notice.date}</p>
                </li>
              ))}
            </ul> */}
        </div>
        <div
          id="notice_ask"
          className={`tabcontent ${
            this.state.activeTab === "notice_ask" ? "active" : ""
          }`}
        >
          <p>자주묻는 질문</p>
        </div>
        <div
          id="notice_inquiry"
          className={`tabcontent ${
            this.state.activeTab === "notice_inquiry" ? "active" : ""
          }`}
        >
          <div className="notice_email">
            <p>이메일</p>
            <input type="text" size={90} />
          </div>
          <div className="notice_name">
            <p>이름</p>
            <input type="text" size={90}></input>
          </div>
          <div className="notice_number">
            <p>휴대전화번호(선택)</p>
            <input type="text" size={90}></input>
          </div>
          <div className="notice_tittle">
            <p>제목</p>
            <input type="text" size={90}></input>
          </div>
          <div className="notice_qu">
            <p>문의사항</p>
            <input type="text" size={90}></input>
          </div>
          <div>
            <button onClick={this.handleTabClickl}>문의하기</button>
            {/* <p>{message}</p> */}
          </div>
          <p>{message}</p>
        </div>
      </div>
    );
  }
}

export default Ask;
