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
231029 김장훈 -로그인 시 쿠키에 사용자 이름, 목표값 저장되도록 수정
--------------------------------------------------------------------------------------------------------------*/
const express = require("express");
const session = require("express-session");
const app = express(); // Express 앱을 생성
const port = 3003; // 서버가 사용할 포트 번호를 정의
const cors = require("cors"); // CORS 미들웨어를 추가
const fs = require("fs");
const path = require("path"); // path 모듈
const cookieParser = require("cookie-parser");
const users = require("./db.json").user; // db.json 파일에서 사용자 정보를 가져와 변수에 저장
const groups = require("./db.json").group; // db.json파일에서 그룹 정보를 가져와 변수에 저장
app.use(express.json()); // Express 앱이 JSON 요청을 처리할 수 있도록 미들웨어를 추가
app.use(
  cors({
    origin: "http://localhost:3000", // 클라이언트 주소
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // 쿠키 전송을 위한 설정
  })
); // CORS 활성화

// 쿠키설정
app.use(cookieParser());
app.use(
  session({
    secret: "mysecretkey", // 세션 암호화 키
    resave: false, // 세션 데이터를 강제로 저장하지 않음
    saveUninitialized: true, // 초기화되지 않은 세션을 저장
    cookie: { secure: false }, // 클라이언트와 서버간의 HTTPS 통신에서만 쿠키 전송
  })
);
//Login
app.post("/login", (req, res) => {
  const { id, pw } = req.body;
  const user = users.find((u) => u.id === id && u.pw === pw);

  if (user) {
    // 로그인 성공 시 쿠키에 사용자 정보 저장
    req.session.user = user;
    //res.send(req.session.user);

    // 쿠키에 name, weight, exercise, diet 정보 저장
    res.cookie("name", user.name, { maxAge: 1800000, httpOnly: true });
    res.cookie("weight", user.weight, { maxAge: 1800000, httpOnly: true });
    res.cookie("exercise", user.exercise, { maxAge: 1800000, httpOnly: true });
    res.cookie("diet", user.diet, { maxAge: 1800000, httpOnly: true });
    
    res.cookie("sessionId", req.session.id, {
      path: "/",
      httpOnly: true,
      secure: true,
      maxAge: 1800000,
    }); // 0.5시간 동안 유효

    //res.cookie('user', JSON.stringify(user), { maxAge: 900000, httpOnly: true }); //쿠키 저장, 15분
    res.status(200).json({ message: "로그인 성공", user });
  } else {
    res.status(401).json({ message: "로그인 실패" });
  }
});
//Logout
app.get("/logout", (req, res) => {
  // 세션 쿠키 삭제
  req.session.destroy((err) => {
    if (err) {
      console.error("세션 삭제 오류:", err);
      res.status(500).json({ message: "세션 삭제 오류" });
    } else {
      // 세션 또는 쿠키에서 사용자 정보를 제거하는 등의 작업을 수행할 수 있습니다.
      res.clearCookie("sessionId");
      res.sendStatus(200);
    }
  });
});
//쿠키 설정으로 쿠키 로그 확인
app.get("/cookie", (req, res) => {
  if (req.cookies.sessionId) {
    // 로그인한 사용자만 액세스 가능
    res.status(200).json({ message: "로그인가능상태" });
  } else {
    res.status(403).json({ message: "액세스 거부" });
  }
});

//GoalSet.js 사용자 목표설정 db.json에 추가기능
app.patch("/user/:id", async (req, res) => {
  const userId = req.params.id;
  const { weight, exercise, diet } = req.body;
  try {
    // db.json 파일 읽어오기
    const data = await fs.promises.readFile("./db.json", "utf8");
    // db.json 파일을 자바스크립트 객체화
    const jsonData = JSON.parse(data);
    // db.json 파일에서 user 정보만 users 정보에 담기
    const users = jsonData.user;
    //console.log(users);
    const groups = jsonData.group;
    //console.log(groups);
    const user = users.find((u) => u.id === userId);

    if (!user) {
      res.status(404).json({ message: "사용자를 찾을 수 없습니다" });
      return;
    }
    //데이터 업데이트
    user.weight = weight;
    user.exercise = exercise;
    user.diet = diet;

    // JSON 문자열로 변환
    const updatedData = JSON.stringify(
      {
        user: users,
        group: groups,
      },
      null,
      2
    );
    await fs.promises.writeFile("./db.json", updatedData, "utf8");
    console.log("업데이트 결과", updatedData);
    res.status(200).json({ message: "사용자 정보가 업데이트되었습니다", user });
  } catch (err) {
    console.error("파일 처리 오류: ", err);
    res.status(500).json({ message: "서버 오류" });
  }
});

//그룹을 요청처리하는 라우트
app.get("/group", (req, res) => {
  // 여기에서 데이터베이스에서 데이터를 가져오는 코드를 작성합니다.
  // 이 예시에서는 하드코딩된 데이터를 사용합니다.
  res.json(groups);
});
//그룹 추가하는 라우트
app.post("/groupadd", async (req, res) => {
  const newGroup = req.body;
  try {
    //파일 불러오기
    const jsonData = await fs.promises.readFile("./db.json", "utf8");
    const data = JSON.parse(jsonData);
    //console.log(data);
    const nextGroupId = data.group.length + 1;
    const newgroupData = {
      id: nextGroupId,
      name: newGroup.name,
      category: newGroup.category,
      img: newGroup.img,
      goal: newGroup.goal,
      groupintro: newGroup.groupintro,
    };
    // 데이터 객체에 새로운 그룹 추가
    data.group.push(newgroupData);
    //console.log(data.group);
    const updatedDataGroup = JSON.stringify(data, null, 2);
    console.log(updatedDataGroup);
    await fs.promises.writeFile("./db.json", updatedDataGroup, "utf8");
    res.status(200).json({ id: nextGroupId }); // 새로운 그룹의 ID 반환
  } catch (error) {
    console.error("파일 작업 중 오류 발생:", error);
    res.status(500).json({ message: "파일 작업 중 오류가 발생했습니다." });
  }
});
//실행중
app.listen(port, () => {
  console.log(`서버가 ${port} 포트에서 실행 중입니다.`);
});
