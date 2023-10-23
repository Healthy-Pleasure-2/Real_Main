const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000; 

// JSON 파일 경로
const jsonFilePath = path.join(__dirname, 'data.json');

// JSON 데이터를 읽어오는 엔드포인트
app.get('/api/data', (req, res) => {
  fs.readFile(jsonFilePath, (err, data) => {
    if (err) {
      console.error('파일 읽기 오류:', err);
      res.status(500).json({ error: '데이터를 읽을 수 없습니다.' });
      return;
    }

    const jsonData = JSON.parse(data);
    res.json(jsonData);
  });
});

app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});
