/*
-소스명 : server.js
-작성자 : 김장훈
-이 페이지 용도 : 로그인 검증
-생성일자(수정일자) : 231024 최초생성
--------------------------------------------------------------------------------------------------------------*/


const express = require('express');
const app = express();
const port = 3003;
const cors = require('cors'); // CORS 미들웨어 추가

app.use(express.json());
app.use(cors()); // CORS 활성화

const users = require('./db.json').user;

app.post('/user', (req, res) => {
  const { id, pw } = req.body;

  const user = users.find((u) => u.id === id && u.pw === pw);

  if (user) {
    res.status(200).json({ message: '로그인 성공', user });
  } else {
    res.status(401).json({ message: '로그인 실패' });
  }
});

app.listen(port, () => {
  console.log(`서버가 ${port} 포트에서 실행 중입니다.`);
});
