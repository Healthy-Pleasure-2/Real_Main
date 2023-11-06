const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express(); // Express 앱을 생성
const port = 3003; // 서버가 사용할 포트 번호를 정의
const cors = require("cors"); // CORS 미들웨어를 추가
const fs = require("fs");
const cookieParser = require("cookie-parser");


async function Datafc() {
  try {
    const jsonData = await fs.promises.readFile("./db.json", "utf8");
    const data = JSON.parse(jsonData);
    return data;
  } catch (error) {
    console.error("Error reading data:", error);
    throw error;
  }
}
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json()); // Express 앱이 JSON 요청을 처리할 수 있도록 미들웨어를 추가
app.use(
  cors({
    origin: "http://localhost:3000", // 클라이언트 주소
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // 쿠키 전송을 위한 설정
  })
); // CORS 활성화
//세션키 암호화
const crypto = require("crypto");
const generateRandomKey = (length) => {
  return crypto.randomBytes(length).toString("hex");
};
const sessionKey = generateRandomKey(32);
// 쿠키설정
app.use(cookieParser());
app.use(
  session({
    secret: sessionKey, // 세션 암호화 키
    resave: false, // 세션 데이터를 강제로 저장하지 않음
    saveUninitialized: true, // 초기화되지 않은 세션을 저장
    cookie: { secure: false }, // 클라이언트와 서버간의 HTTPS 통신에서만 쿠키 전송
  })
);
//APP.js 에서 불러옴
app.post("/login", async (req, res) => {
  const data = await Datafc();
  const users = data.user;
  const { id, pw } = req.body;
  const user = users.find((u) => u.id === id && u.pw === pw);
  if (user) {
    const userid = user.id;
    // 로그인 성공 시 쿠키에 사용자 정보 저장
    req.session.user = user;
    //res.send(req.session.user);
    res.cookie("sessionId", req.session.id, {
      path: "/",
      httpOnly: true,
      //secure: true,
      maxAge: 1800000,
    }); // 0.5시간 동안 유효
    //res.cookie('user', JSON.stringify(user), { maxAge: 900000, httpOnly: true }); //쿠키 저장, 15분
    res.status(200).json({ message: "로그인 성공", userid });
  } else {
    res.status(401).json({ message: "로그인 실패" });
  }
});
//Logout  //APP.js 에서 불러옴
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

//쿠키 설정으로 쿠키 로그 확인    //APP.js 에서 불러옴
app.get(
  "/cookie",
  (req, res) => {
    if (req.cookies.sessionId) {
      // 로그인한 사용자만 액세스 가능
      if (req.session.user) {
        // 로그인한 사용자만 액세스 가능
        const userid = req.session.user.id;
        res.status(200).json({ message: "로그인상태", userid });
      }
    }
  }
);

//GoalSet.js 사용자 목표설정 db.json에 추가기능
//GoalSet.js 사용자 목표설정 db.json에 추가기능
app.patch("/user/:id", async (req, res) => {
  const userId = req.params.id;
  const { weight, exercise, diet } = req.body;
  try {
    const data = await Datafc();
    const users = data.user;
    const groups = data.group;
    const todos = data.todo;
    const user = users.find((u) => u.id === userId);
    if (!user) {
      res.status(404).json({ message: "사용자를 찾을 수 없습니다" });
      return;
    }
    user.weight = weight;
    user.exercise = exercise;
    user.diet = diet;
    const updatedData = JSON.stringify(
      {
        user: users,
        group: groups,
        todo: todos
      },
      null,
      2
    );
    await fs.promises.writeFile("./db.json", updatedData, "utf8");
    res.status(200).json({ message: "사용자 정보가 업데이트되었습니다", user });
  } catch (err) {
    console.error("파일 처리 오류: ", err);
    res.status(500).json({ message: "서버 오류" });
  }
});

// db.json에서 todo 테이블 데이터 가져오기
app.get("/todo/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const { date } = req.query;
    const data = await Datafc();
    const user = data.todo.find((obj) => userId in obj);
    if (user[userId]) {
      const matchingDate = user[userId].find((item) => item.date === date);
      if (matchingDate) {
        const contents = matchingDate.contents;
        res.status(200).json({
          message: "해당 날짜에 데이터를 찾았습니다.",
          contents,
          matchingDate,
        });
      } else {
        res.status(200).json({ message: "해당 날짜를 찾지 못했습니다." });
      }
    } else {

    }
  } catch (error) {
    console.error("파일 작업 중 오류 발생:", error);
    res.status(500).json({ message: "파일 작업 중 오류가 발생했습니다." });
  }
});

// db.json에서 todo 테이블에 데이터 추가
app.post("/todo", async (req, res) => {
  try {
    const dataToSubmit = req.body;
    const toDo = dataToSubmit.toDo;
    const userId = dataToSubmit.userId;
    const date = toDo.date;
    // JSON 파일 읽기
    const data = await fs.promises.readFile("./db.json", "utf8");
    const existingData = JSON.parse(data);

    // 해당 userId에 대한 할일 목록을 찾아서 데이터 추가
    const userTodoList = existingData.todo.find((user) => user[userId]);
    const userTodo = userTodoList[userId];
    const matchingTodo = userTodo.find((item) => item.date === date);

    // 해당 userId에 해당되는 할일 목록이 없으면 그냥 todo push
    // 기존 배열과 날짜가 일치하면 contents에만 push
    // 만약에 날짜에 해당되는 배열이 없으면 그냥 push
    if (userTodo.length === 0 || matchingTodo === undefined) {
      userTodoList[userId].push(toDo);
    } else if (matchingTodo.length !== 0) {
      // 날짜가 겹치는 배열이 있으면 그 배열의 contents 값에 contents만 push
      matchingTodo.contents.push(toDo.contents[0]);
    }

    // 업데이트된 데이터 JSON 문자열로 변환
    const updatedDataGroup = JSON.stringify(existingData, null, 2);

    // JSON 파일에 업데이트된 데이터 쓰기
    await fs.promises.writeFile("./db.json", updatedDataGroup, "utf8");

    res.status(200).json({ message: "데이터가 성공적으로 추가되었습니다." });
  } catch (error) {
    console.error("파일 작업 중 오류 발생:", error);
    res.status(500).json({ message: "파일 작업 중 오류가 발생했습니다." });
  }
});

// db.json에서 삭제기능
app.patch("/todo/delete/contents", async (req, res) => {
  try {
    const item = req.body;
    const userId = item.id;
    const date = item.fullDate;
    const text = item.text;
    // db.json 파일 읽어오기
    const data = await fs.promises.readFile("./db.json", "utf8");
    // db.json 파일을 자바스크립트 객체화
    const jsonData = JSON.parse(data);
    // db.json 파일에서 user 정보만 users 정보에 담기
    const todos = jsonData.todo;

    // todo 배열에서 삭제 대상 식별
    const userTodo = todos.find((obj) => userId in obj);

    if (userTodo) {
      // 클릭한 날짜와 같은 데이터 추출
      const dateTodo = userTodo[userId].find((obj) => obj.date === date);
      if (dateTodo) {
        // 클릭한 todolist의 text와 같은 것을 제외하고 보여주기(filter 함수 이용)
        dateTodo.contents = dateTodo.contents.filter(
          (obj) => obj.content !== text
        );

        // JSON 문자열로 변환
        const updatedData = JSON.stringify(jsonData, null, 2);

        // 데이터 업데이트
        await fs.promises.writeFile("./db.json", updatedData, "utf8");
        res
          .status(200)
          .json({ message: "사용자 투두리스트가 업데이트되었습니다" });
      } else {
        res
          .status(404)
          .json({ message: "해당 날짜에 대한 항목을 찾을 수 없습니다" });
      }
    } else {
      res
        .status(404)
        .json({ message: "해당 사용자에 대한 항목을 찾을 수 없습니다" });
    }
  } catch (error) {
    console.error("파일 처리 오류: ", error);
    res.status(500).json({ message: "서버 오류" });
  }
});

// db.json에서 완료버튼 값 변경하는 라우트
app.patch("/todo/complete/contents", async (req, res) => {
  try {
    const item = req.body;
    const userId = item.id;
    const date = item.fullDate;
    const text = item.text;

    // db.json 파일 읽어오기
    const data = await fs.promises.readFile("./db.json", "utf8");
    // db.json 파일을 자바스크립트 객체화
    const jsonData = JSON.parse(data);
    const todos = jsonData.todo;

    // 데이터 업데이트
    // todo 배열에서 삭제 대상 식별
    const userTodo = todos.find((obj) => userId in obj);

    if (userTodo) {
      const dateTodo = userTodo[userId].find((obj) => obj.date === date);
      if (dateTodo) {
        // 클릭한 todolist의 text와 같은 항목을 찾기
        const todoItem = dateTodo.contents.find((obj) => obj.content === text);

        if (todoItem) {
          // complete 값을 반대로 변경 (true -> false 또는 false -> true)
          todoItem.complete = !todoItem.complete;

          // JSON 문자열로 변환
          const updatedData = JSON.stringify(jsonData, null, 2);

          // 데이터 업데이트
          await fs.promises.writeFile("./db.json", updatedData, "utf8");
          res
            .status(200)
            .json({ message: "사용자 투두리스트가 업데이트되었습니다" });
        } else {
          res.status(404).json({ message: "해당 항목을 찾을 수 없습니다" });
        }
      } else {
        res
          .status(404)
          .json({ message: "해당 날짜에 대한 항목을 찾을 수 없습니다" });
      }
    } else {
      res
        .status(404)
        .json({ message: "해당 사용자에 대한 항목을 찾을 수 없습니다" });
    }
  } catch (error) {
    console.error("파일 처리 오류: ", error);
    res.status(500).json({ message: "서버 오류" });
  }
});

//Slide에서 불러옴
app.get("/mygroup/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    // 읽어온 데이터 객체를 클라이언트로 반환
    const data = await Datafc();
    const users = data.user;
    const groups = data.group;
    const user = users.find((u) => u.id === userId); //로그인한 유저찾기
    if (user) {
      const userGroupIds = user.group; // 사용자의 그룹 아이디 배열
      // userGroupIds와 groups에서 일치하는 그룹을 찾음
      const userGroups = groups.filter((group) =>
        userGroupIds.includes(group.id.toString())
      );
      res.json(userGroups);
    } else {
      res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }
  } catch (error) {
    console.error("파일 작업 중 오류 발생:", error);
    res.status(500).json({ message: "파일 작업 중 오류가 발생했습니다." });
  }
});
//그룹을 요청처리하는 라우트  //Community.js에서 불러옴
app.get("/group", async (req, res) => {
  try {
    const data = await Datafc();
    // 읽어온 데이터 객체를 클라이언트로 반환
    res.json(data.group);
  } catch (error) {
    console.error("파일 작업 중 오류 발생:", error);
    res.status(500).json({ message: "파일 작업 중 오류가 발생했습니다." });
  }
});
//그룹 추가하는 라우트  //Groupcreate.js에서 불러옴
app.post("/groupadd/:userId", async (req, res) => {
  const newGroup = req.body;
  const userId = req.params.userId;
  try {
    const data = await Datafc();
    const users = data.user;
    const user = users.find((u) => u.id === userId);
    const nextGroupId = data.group.length + 1;
    const newgroupData = {
      id: nextGroupId,
      name: newGroup.name,
      category: newGroup.category,
      img: newGroup.img,
      goal: newGroup.goal,
      grouptotal: 0,
      groupintro: newGroup.groupintro,
    };
    if (user) {
      data.group.push(newgroupData);
      const updatedDataGroup = JSON.stringify(data, null, 2);
      await fs.promises.writeFile("./db.json", updatedDataGroup, "utf8");
      res.status(200).json({ message: "그룹생성성공" }); // 새로운 그룹의 ID 반환
      // 데이터 객체에 새로운 그룹 추가
    }
  } catch (error) {
    res.status(500).json({ message: "파일 작업 중 오류가 발생했습니다." });
  }
});
//GroupPage.js에서 Effect에서 사용
app.get("/groupjoin/:userid", async (req, res) => {
  try {
    const userid = req.params.userid;
    const groupId = req.query.groupId;
    const data = await Datafc();
    const user = data.user.find((u) => u.id === userid);
    if (user) {
      const nickname = user.nickname;
      if (user.group.includes(groupId.toString())) {
        // 읽어온 데이터 객체를 클라이언트로 반환
        res.json({ message: "true", nickname });
      } else {
        res.json({ message: "false" });
      }
    }
  } catch (error) {
    console.error("파일 작업 중 오류 발생:", error);
    res.status(500).json({ message: "파일 작업 중 오류가 발생했습니다." });
  }
});
//Grouppage.js에서 불러옴, 참여하기 누르면 user정보 변경
app.post("/communicate/:id", async (req, res) => {
  const userId = req.params.id;
  const { groupId } = req.body;
  try {
    const data = await Datafc();
    const users = data.user;
    const user = users.find((u) => u.id === userId);
    if (user) {
      if (user.group.includes(groupId.toString())) {
        user.group = user.group.filter((groupItem) => groupItem !== groupId);
        const updatedDataGroup = JSON.stringify(data, null, 2);
        await fs.promises.writeFile("./db.json", updatedDataGroup, "utf8");
        res.json({ message: "false" });
      } else {
        // 새로운 값(groupId)을 배열에 추가합니다.
        user.group.push(groupId);
        const updatedDataGroup = JSON.stringify(data, null, 2);
        await fs.promises.writeFile("./db.json", updatedDataGroup, "utf8");
        res.json({ message: "true" });
      }
    } else {
      res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }
  } catch (error) {
    console.error("파일 작업 중 오류 발생:", error);
    res.status(500).json({ message: "파일 작업 중 오류가 발생했습니다." });
  }
});

//Signup.js에서 불러옴 회원가입하는 API
app.post("/Signup", async (req, res) => {
  const newuser = req.body;
  try {
    //파일 불러오기
    const data = await Datafc();
    const newuserindex = data.user.length + 1;
    const newuserData = {
      index: newuserindex,
      id: newuser.id,
      pw: newuser.pw,
      name: newuser.name,
      gende: newuser.gende,
      nickname: newuser.nickname,
      email: newuser.email,
      group: [],
      weight: "",
      exercise: "",
      diet: "",
    };
    const newTodoUser = newuser.id
    const newTodoData = {
      [newTodoUser]: []
    }
    data.user.push(newuserData);
    // todolist에 새로운 테이블 생성 
    data.todo.push(newTodoData);
    const updatedDataGroup = JSON.stringify(data, null, 2);
    await fs.promises.writeFile("./db.json", updatedDataGroup, "utf8");
    res.status(200).json({ message: "회원가입 되셨습니다." }); // 새로운 그룹의 ID 반환
  } catch (error) {
    console.error("파일 작업 중 오류 발생:", error);
    res.status(500).json({ message: "파일 작업 중 오류가 발생했습니다." });
  }
});

// Goal_Circle, 사용자 weight, exercise, diet 값 처리
app.get("/user_Goal/:id", async (req, res) => {
  const userId = req.params.id; // Goal_Circle에서 전달된 사용자 ID
  try {
    // db.json 파일 읽어오기
    const jsonData = await fs.promises.readFile("./db.json", "utf8");
    // db.json 파일을 자바스크립트 객체로 파싱
    const data = JSON.parse(jsonData);
    //db에 저장된 사용자 id와 전달된 id 같은지 찾기
    const user = data.user.find((u) => u.id === userId);
    //있으면, 해당 user정보를 가져옴
    if (user) {
      //user정보중 몸무게, 운동, 식단 정보를 추출 후 반환
      const { name, weight, exercise, diet } = user;
      res.status(200).json({ name, weight, exercise, diet });
    } else {
      res.status(404).json({ message: "사용자를 찾을 수 없습니다" });
    }
  } catch (error) {
    console.error("server.js 파일 처리 오류:", error);
    res.status(500).json({ message: "서버 오류" });
  }
});

// id_pw.js -> ID 찾기 요청 핸들러
app.post("/Find_id", async (req, res) => {
  const data = await Datafc();
  const users = data.user;
  const { name, email } = req.body;

  const user = users.find((u) => u.name === name && u.email === email);
  if (user) {
    const userid = user.id;

    // ID를 클라이언트에게 반환
    res.status(200).json({ message: "ID 찾기 성공", userid });
  } else {
    res.status(401).json({ message: "ID를 찾을 수 없습니다." });
  }
});

// id_pw.js -> PW찾기 요청 핸들러
app.post("/Find_pw", async (req, res) => {
  const data = await Datafc();
  const users = data.user;
  const { id, email } = req.body;

  const user = users.find((u) => u.id === id && u.email === email);
  if (user) {
    const userpw = user.pw;

    // ID를 클라이언트에게 반환
    res.status(200).json({ message: "PW 찾기 성공", userpw });
  } else {
    res.status(401).json({ message: "PW를 찾을 수 없습니다." });
  }
});

// Mypage.js 회원탈퇴 라우터
app.get("/Delete_user/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    // db.json 파일 읽어오기
    const jsonData = await fs.promises.readFile("./db.json", "utf8");
    // db.json 파일을 자바스크립트 객체로 파싱
    const data = JSON.parse(jsonData);

    // db에서 사용자 id와 전달된 id가 같은 사용자를 찾음
    const userIndex = data.user.findIndex((u) => u.id === userId);
    const todoIndex = data.todo.findIndex((u) => u.id === userId);

    if (userIndex !== -1) {
      // 사용자를 찾았을 때
      // 사용자 데이터를 배열에서 삭제
      data.user.splice(userIndex, 1);
      // 사용자 데이터를 배열에서 삭제 
      data.todo.splice(todoIndex, 1);
      // 변경된 데이터를 다시 파일로 씀
      const updatedJsonData = JSON.stringify(data, null, 2);
      await fs.promises.writeFile("./db.json", updatedJsonData);

      res.status(200).json({ message: "사용자 삭제 성공" });
    } else {
      res.status(404).json({ message: "사용자를 찾을 수 없습니다" });
    }
  } catch (error) {
    console.error("서버 파일 처리 오류:", error);
    res.status(500).json({ message: "서버 오류" });
  }
});

//실행중
app.listen(port, () => {
  console.log(`서버가 ${port} 포트에서 실행 중입니다.`);
});
