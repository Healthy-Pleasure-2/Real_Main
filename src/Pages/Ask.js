import "./styles/Ask.css";
import Notice1 from "../components/Notice1";
import FAQ from "../components/FAQ";
import React, { Component } from "react";
import Swal from "sweetalert2";

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
    Swal.fire("문의 완료", "빠른 시일내에 답변 드리겠습니다.", "success");
  };

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
          <label htmlFor="tab1">
            <div>공지사항 &gt;</div>
            <p>Healthy Pleasure에서 전하는 새로운 소식을 확인하세요.</p>
          </label>

          <input
            type="radio"
            id="tab2"
            name="tab"
            checked={this.state.activeTab === "notice_ask"}
            onChange={() => this.handleTabClick("notice_ask")}
          />
          <label htmlFor="tab2">
            <div> 자주묻는질문 &gt;</div>
            <p>궁금한 사항이 있다면 자주 묻는 질문을 확인해 보세요.</p>
          </label>
          <input
            type="radio"
            id="tab3"
            name="tab"
            checked={this.state.activeTab === "notice_inquiry"}
            onChange={() => this.handleTabClick("notice_inquiry")}
          />
          <label htmlFor="tab3">
            <div>1 : 1 문의 &gt;</div>
            <p>그 밖에도 궁금하신 것이 있으신가요?</p>
          </label>
        </div>
        <div
          id="notice_N"
          className={`tabcontent ${this.state.activeTab === "notice_N" ? "active" : ""
            }`}
        >
          <Notice1 />
        </div>
        <div
          id="notice_ask"
          className={`tabcontent ${this.state.activeTab === "notice_ask" ? "active" : ""
            }`}
        >
          <FAQ />
        </div>

        <div
          id="notice_inquiry"
          className={`tabcontent ${this.state.activeTab === "notice_inquiry" ? "active" : ""
            }`}
        >
          <div className="form">
            <div className="Inquiry_left">
              <div className="icon"></div>
              <h1>1 : 1 문의</h1>
              <h3>
                궁금한 사항을 작성해 주시면<br></br>
                이메일로 답변을 보내드리겠습니다.
              </h3>
            </div>
            <div className="form_wrap">
              <div className="notice_name">
                <p>이름</p>
                <input type="text" size={90}></input>
              </div>
              <div className="notice_email">
                <p>이메일</p>
                <input type="email" size={90} />
              </div>
              <div className="notice_number">
                <p>휴대전화번호(선택)</p>
                <input type="tel" size={90}></input>
              </div>
              <div className="notice_tittle">
                <p>제목</p>
                <input type="text" size={90}></input>
              </div>
              <div className="notice_qu">
                <p>문의사항</p>
                <textarea type="" size={90}></textarea>
              </div>
              <div className="notice_btn">
                <button onClick={this.handleTabClickl}>문의하기</button>
              </div>
              <p>{message}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Ask;
