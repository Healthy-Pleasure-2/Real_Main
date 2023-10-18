// 삭제할예정일듯
// 공지사항 API이지만 주소값주는거 다 적어도 안된다.. 뭔가 문제지
// 키값도 다 변동해봐도 안되는데 이유는 뭘까 머리아파

/* 소스명 : notice.js */
/* 작성자: 강수진 */
/* 이 페이지 용도 : 공지사항 API페이지 */
/* 생성일자(수정일자) : 
  - 23.10.16: 생성_강수진 */

import React, { useEffect, useState } from "react";
import axios from "axios";

function Notice() {
  const [notice, setnotice] = useState([]);

  useEffect(() => {
    //작업중
    const apiKey = "5ws8dPPTUDos0PqdpX50kM71A7tZFbqZ6sbDFVSzYiufc49aPbjioDhgFmBkmOu+tPBMNKsRqomlwdRPNbKGzA==";
    const apiUrl = `https://api.odcloud.kr/api/15042479/v1/uddi:7e42d6c1-ad5f-4f0d-8268-c2c7cb557961?page=1&perPage=10&apiKey=${apiKey}`;

    axios
      .get(apiUrl)
      .then((response) => {
        setnotice(response.data.articles);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
      });
  }, []);

  return (
    <div className="notice-container">
      <h1 className="notice-title">공지사항</h1>
        <div className="notice-day">
            <p>2023-07-31</p>
            <p>2023-07-24</p>
            <p>2023-07-07</p>
            <p>2023-06-22</p>
            <p>2023-06-15</p>
            <p>2023-06-14</p>
            <p>2023-06-12</p>
            <p>2023-06-07</p>
            <p>2023-05-12</p>
            <p>2023-04-06</p>
            <p>2023-03-27</p>
            <p>2023-03-24</p>
            <p>2023-03-24</p>
            <p>2023-03-16</p>
            <p>023-03-16</p>
        </div>
        <div className="notice-name">
          <p>2019년 보건소 모바일 헬스케어 관리자 정보 현행화 요청(* 5월 31일 까지)</p>
          <p>2018년 보건소 모바일 헬스케어 사업 최종 성과지표 공지(2018년 등록대상자)</p>
          <p>2020년 아동청소년 모바일 헬스케어 시범사업 참여안내</p>
          <p>권역별 간담회 공지 필독 안내</p>
          <p>2018년 보건소 모바일 헬스케어 주요 성과지표 공유(산출일자 : 2018년 12월 9일 기준)</p>
          <p>2018년 보건소 모바일 헬스케어 사업 최종 성과지표 공지</p>
          <p>2019년 보건소 모바일 헬스케어 사업 운영 매뉴얼</p>
          <p>2020년 보건소 모바일 헬스케어 사업 운영매뉴얼</p>
          <p>2018년 보건소 모바일 헬스케어 현장 모니터링 일정 수요조사(~9.19)</p>
          <p>최종검진 기관 관련 유의사항 안내</p>
          <p>보건소 모바일 헬스케어 장기간(3개월 이상) 미접속자 계정 휴면 처리 안내</p>
          <p>사업 안내서, 운영매뉴얼, 이용자용 매뉴얼 송장번호 공유</p>
          <p>개인정보 통합관제 안내</p>
          <p>22년 사업 자료집(안내서, 운영매뉴얼, 이용자 매뉴얼) 발송 지연 안내</p>
          <p>2022년 상반기 보건소 모바일 헬스케어 사업 운영지원 월간 계획(예정)</p>
        </div>
    </div>
  );
}

export default Notice;