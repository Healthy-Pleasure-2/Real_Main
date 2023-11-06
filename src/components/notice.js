import React, { useEffect, useState } from "react";
import axios from "axios";

function Notice() {
  const [notice, setnotice] = useState([]);

  useEffect(() => {
    //작업중
    const apiKey =
      "5ws8dPPTUDos0PqdpX50kM71A7tZFbqZ6sbDFVSzYiufc49aPbjioDhgFmBkmOu+tPBMNKsRqomlwdRPNbKGzA==";
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
      <ul className="notice-list">
        {notice.map((article, index) => (
          <li key={index} className="notice-item">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="notice-link"
            >
              {article.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notice;
