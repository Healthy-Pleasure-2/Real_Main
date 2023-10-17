// 작성자: 이제형 
// 소스명 Mygroup.js
// 페이지 용도: 개인별 목표 페이지 (나의 그룹 위젯)
// 생성 일자(수정 용도): 10/14



function Mygroup() {
  // 슬라이드의 개수: group.json의 길이 
  // 버튼 개수도 슬라이드 개수만큼 생김 
  // 버튼 누를때 그 인덱스 번호로 이동하는 걸로 생성 


  return (
    <div id="my_group">
      <h1>나의 그룹</h1>
      <div className="group_container">
        <div className="slide_contents">
          <div className="group_contents">
            <p className="group_title">그룹명</p>
            <p className="data"></p>
          </div>
          <div className="group_contents">
            <p className="group_title">카테고리</p>
            <p className="data"></p>
          </div>
          <div className="group_contents group_goal">
            <p className="group_title">목표</p>
            <p className="data">물 1리터 마시기</p>
          </div>
        </div>
        <div className="slide_contents">
          <div className="group_contents">
            <p className="group_title">그룹명</p>
            <p className="data"></p>
          </div>
          <div className="group_contents">
            <p className="group_title">카테고리</p>
            <p className="data"></p>
          </div>
          <div className="group_contents group_goal">
            <p className="group_title">목표</p>
            <p className="data">dfdgdgfdgdjljhiohoihioㅊㅎㄹ초/ㅣㅗㅓㅛㅅㄱㅋㅎ</p>
          </div>
        </div>
      </div>
      <div className="btns">
        <button className="prev"></button>
        <button className="next"></button>
      </div>
    </div>
  )
}






export default Mygroup;