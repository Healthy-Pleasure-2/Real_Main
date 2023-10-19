/* 소스명 : GroupCreate.css */
/* 작성자: 강수진, 이진경 */
/* 이 페이지 용도 : 그룹 생성하기 페이지 CSS */
/* 생성일자(수정일자) : 
  - 23.10.13: 수정_이진경 */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "antd";

function Diet() {
  const [diet, setNews] = useState([]);

  useEffect(() => {
    // NewsAPI에서 뉴스 데이터를 가져오는 API 키를 사용하세요.
    const apiKey = "20231012W0B8WFWKCESA8YPD8DAG";
    const apiUrl = `http://api.nongsaro.go.kr/service/recomendDiet/mainCategoryList&apiKey=${apiKey}`;
    // const cntntsNo = Input;
    // const dietSeCode = Input;
    axios
      .get(apiUrl)
      .then((response) => {
        setNews(response.data.articles);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
      });
  }, []);

  return (
    <div className="diet-container">
      <h1 className="diet-title">식단</h1>
      <ul className="diet-list">
        {diet.map((article, index) => (
          <li key={index} className="diet-item">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="diet-link"
            >
              {article.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Diet;
