/*
-소스명 : server.js
-작성자 : 김장훈, 정은정, 이제형, 강수진
-이 페이지 용도 : 서버
-생성일자(수정일자) : 2310__ 최초생성
-로그
2310__  _____ - 최초생성
231024 김장훈 - db.json 파일을 이용한 로그인기능 구현
231025 정은정 - cooki, session 을 이용한 상태관리 구현(수정필요)
231025 이제형, 김장훈 - GoalSet.js 목표설정 업로드기능 구현(수정필요)
231026 정은정, 김장훈 - 로그인 상태관리 수정
231027 강수진 - 그룹가입 코드구성
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

app.use(express.static(path.join(__dirname, "build")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
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

app.use(express.static(path.join(__dirname, "build")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

/*************그룹 */
app.post("/user/:group", (req, res) => {
    const userId = req.params.userid;
    const groupId = req.params.groupid;
  
    // db.json 파일 읽기
    fs.readFile("./db.json", "utf8", (err, data) => {
      if (err) {
        res.status(500).json({ message: "서버 오류" });
        return;
      }
  
      // db.json 파일을 JavaScript 객체로 파싱
      const jsonData = JSON.parse(data);
  
      // 사용자와 그룹 정보 가져오기
      const users = jsonData.user;
      const groups = jsonData.group;
  
      // 사용자와 그룹을 찾기
      const user = users.find((u) => u.id === userId);
      const group = groups.find((g) => g.id === groupId);
  
      if (!user || !group) {
        res.status(404).json({ message: "사용자 또는 그룹을 찾을 수 없습니다" });
        return;
      }
  
      // 사용자가 이미 그룹에 가입되어 있는지 확인
      if (user.groups.includes(groupId)) {
        res.status(400).json({ message: "이미 그룹에 가입되어 있습니다" });
        return;
      }
  
      // 사용자를 그룹에 추가
      user.groups.push(groupId);
      // 그룹의 멤버 목록 업데이트
      group.members.push(userId);
  
      // db.json 파일 업데이트
      fs.writeFile("./db.json", JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
          res.status(500).json({ message: "서버 오류" });
        } else {
          res.status(200).json({ message: "그룹 가입 성공" });
        }
      });
    });
  });
  

//실행중
app.listen(port, () => {
  console.log(`서버가 ${port} 포트에서 실행 중입니다.`);
});
