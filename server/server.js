/*
-소스명 : server.js
-작성자 : 김장훈, 정은정, 이제형
-이 페이지 용도 : 서버
-생성일자(수정일자) : 2310__ 최초생성
-로그
2310__  _____ - 최초생성
231024 김장훈 - db.json 파일을 이용한 로그인기능 구현
231025 정은정 - cooki, session 을 이용한 상태관리 구현(수정필요)
231025 이제형, 김장훈 - GoalSet.js 목표설정 업로드기능 구현(수정필요)
231026 정은정, 김장훈 - 로그인 상태관리 수정
--------------------------------------------------------------------------------------------------------------*/
const express = require('express');
const session = require("express-session");
const app = express(); // Express 앱을 생성
const port = 3003; // 서버가 사용할 포트 번호를 정의
const cors = require('cors'); // CORS 미들웨어를 추가
const fs = require('fs');
const users = require('./db.json').user; // db.json 파일에서 사용자 정보를 가져와 변수에 저장
const groups = require('./db.json').group // db.json파일에서 그룹 정보를 가져와 변수에 저장

app.use(express.json()); // Express 앱이 JSON 요청을 처리할 수 있도록 미들웨어를 추가
app.use(cors()); // CORS 활성화


//로그인 로직
app.post("/user", (req, res) => {  
  const { id, pw } = req.body;

  const user = users.find((u) => u.id === id && u.pw === pw);

  if (user) {
    res.status(200).json({ message: '로그인 성공', user });
    
    console.log(user);
  } else {
    res.status(401).json({ message: '로그인 실패' });
  }
});


//GoalSet.js 사용자 목표설정 db.json에 추가기능
app.patch('/user/:id', async (req, res) => {
    const userId = req.params.id;
    const {weight, exercise, diet} = req.body;
    try {
        // db.json 파일 읽어오기
        const data = await fs
            .promises
            .readFile('./db.json', 'utf8');
        // db.json 파일을 자바스크립트 객체화
        const jsonData = JSON.parse(data);
        // db.json 파일에서 user 정보만 users 정보에 담기
        const users = jsonData.user;
        console.log(users);
        const groups = jsonData.group;
        console.log(groups);
        const user = users.find((u) => u.id === userId);

        if (!user) {
            res
                .status(404)
                .json({message: '사용자를 찾을 수 없습니다'});
            return;
        }
        //데이터 업데이트
        user.weight = weight;
        user.exercise = exercise;
        user.diet = diet;

        // JSON 문자열로 변환
        const updatedData = JSON.stringify({
            user: users,
            group: groups
        }, null, 2);
        await fs
            .promises
            .writeFile('./db.json', updatedData, 'utf8');
        console.log('업데이트 결과', updatedData);
        res
            .status(200)
            .json({message: '사용자 정보가 업데이트되었습니다', user});
    } catch (err) {
        console.error('파일 처리 오류: ', err);
        res
            .status(500)
            .json({message: '서버 오류'});
    }
});


//실행중
app.listen(port, () => {
    console.log(`서버가 ${port} 포트에서 실행 중입니다.`);
});