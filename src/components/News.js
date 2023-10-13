// src/components/News.js
import React, { useEffect, useState } from "react";
import axios from "axios";

function News() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    // NewsAPI에서 뉴스 데이터를 가져오는 API 키를 사용하세요.
    const apiKey = "90fef2863b014da2a5c2b6962432a6f2";
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${apiKey}`;

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
    <div className="news-container">
      <h1 className="news-title">뉴스</h1>
      <ul className="news-list">
        {news.map((article, index) => (
          <li key={index} className="news-item">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="news-link"
            >
              {article.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default News;
