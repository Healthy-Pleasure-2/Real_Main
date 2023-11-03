import React, { useEffect, useState } from "react";
import axios from "axios";

function News() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_NEWS_API_KEY;

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
      <h1 className="news-title">News</h1>
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
