const express = require('express'); // Express 프레임워크를 가져옵니다.
const app = express(); // Express 앱을 생성합니다.
const port = 3003; // 서버가 사용할 포트 번호를 정의합니다.
const cors = require('cors'); // CORS 미들웨어를 추가하기 위해 모듈을 가져옵니다.
const fs = require('fs');

app.use(express.json()); // Express 앱이 JSON 요청을 처리할 수 있도록 미들웨어를 추가합니다.
app.use(cors()); // CORS 미들웨어를 활성화합니다. 이를 통해 다른 도메인에서의 요청을 허용합니다.
//app.use(cookieParser());  Cookie 파서 미들웨어를 활성화합니다. (아직 주석 처리되어 있습니다)

const users = require('./db.json').user; // db.json 파일에서 사용자 정보를 가져와 변수에 저장합니다.
const groups = require('./db.json').gorup // db.json파일에서 그룹 정보를 가져와 변수에 저장
app.post('/user', (req, res) => {
    const {id, pw} = req.body; // POST 요청의 본문(body)에서 id와 pw를 추출합니다.

    const user = users.find((u) => u.id === id && u.pw === pw); // 사용자 배열에서 해당 ID와 PW를 가진 사용자를 찾습니다.

    if (user) {
        // 로그인 성공 시 쿠키에 사용자 정보 저장 (아직 주석 처리되어 있습니다) res.cookie('user',
        // JSON.stringify(user), { maxAge: 900000, httpOnly: true });
        res
            .status(200)
            .json({message: '로그인 성공', user}); // 로그인 성공 응답을 반환합니다.
    } else {
        res
            .status(401)
            .json({message: '로그인 실패'}); // 로그인 실패 응답을 반환합니다.
    }
});

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

app.listen(port, () => {
    console.log(`서버가 ${port} 포트에서 실행 중입니다.`);
});