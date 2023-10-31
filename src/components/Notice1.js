function Notice1() {
  return (
    <div className="notice-container">
      <div className="notice_serch">
        <input type="serch" placeholder="검색어 입력" />
        <button>검색</button>
      </div>
      <div className="notice_List">
        <ul>
          <li className="notice_List_title">
            <div className="notice_flex-item">NO.</div>
            <div className="notice_flex-item">제목</div>
            <div className="notice_flex-item">등록일</div>
          </li>
          <li className="notice_List_neyong">
            <div className="notice_flex-item">
              <span>공지</span>
            </div>
            <div className="notice_flex-item">서비스 점검 안내</div>
            <div className="notice_flex-item">2023-10-21</div>
          </li>
          <li className="notice_List_neyong">
            <div className="notice_flex-item">
              {" "}
              <span>공지</span>
            </div>
            <div className="notice_flex-item">휴먼계정 별도 보관 안내</div>
            <div className="notice_flex-item">2023-10-21</div>
          </li>
          <li className="notice_List_neyong">
            <div className="notice_flex-item">
              {" "}
              <span>공지</span>
            </div>
            <div className="notice_flex-item">
              홈페이지 개인정보취급방침 변경안내
            </div>
            <div className="notice_flex-item">2023-10-21</div>
          </li>
          <li className="notice_List_neyong">
            <div className="notice_flex-item">
              {" "}
              <span>공지</span>
            </div>
            <div className="notice_flex-item">이용약관 변경 안내</div>
            <div className="notice_flex-item">2023-10-21</div>
          </li>
          <li className="notice_List_neyong">
            <div className="notice_flex-item">
              {" "}
              <span>이벤트</span>
            </div>
            <div className="notice_flex-item">당첨자 발표</div>
            <div className="notice_flex-item">2023-10-21</div>
          </li>
          <li className="notice_List_neyong">
            <div className="notice_flex-item">
              {" "}
              <span>공지</span>
            </div>
            <div className="notice_flex-item">
              커뮤니티 서비스 일시 중단 안내
            </div>
            <div className="notice_flex-item">2023-10-21</div>
          </li>
          <li className="notice_List_neyong">
            <div className="notice_flex-item">10</div>
            <div className="notice_flex-item">추석 연휴 고객센터 휴무 안내</div>
            <div className="notice_flex-item">2023-09-21</div>
          </li>
          <li className="notice_List_neyong">
            <div className="notice_flex-item">9</div>
            <div className="notice_flex-item">test</div>
            <div className="notice_flex-item">2023-09-21</div>
          </li>
          <li className="notice_List_neyong">
            <div className="notice_flex-item">8</div>
            <div className="notice_flex-item">test</div>
            <div className="notice_flex-item">2023-09-21</div>
          </li>
          <li className="notice_List_neyong">
            <div className="notice_flex-item">7</div>
            <div className="notice_flex-item">test</div>
            <div className="notice_flex-item">2023-09-21</div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Notice1;
