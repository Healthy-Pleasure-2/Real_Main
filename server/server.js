//

const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 4000;
const mysql = require('mysql')


// const connection = mysql.createConnection({
//     host: 'localhost', // MySQL 서버 호스트
//     user: 'username', // MySQL 사용자명
//     password: 'password', // MySQL 암호
//     database: 'database_name', // 사용할 데이터베이스 이름
// });
  
//   // MySQL 연결
// connection.connect((err) => {
//     if (err) {
//       console.error('MySQL 연결 오류:', err);
//       return;
//         }
//     console.log('MySQL 연결 성공');
// });
  
// // MySQL 쿼리 실행 예제
  
// connection.query('SELECT * FROM table_name', (err, results) => {
//     if (err) {
//       console.error('쿼리 실행 오류:', err);
//       return;
//     }
//     console.log('쿼리 결과:', results);
// });
  
// // MySQL 연결 종료
// connection.end((err) => {
//     if (err) {
//       console.error('MySQL 연결 종료 오류:', err);
//       return;
//     }
//     console.log('MySQL 연결 종료');
// });




//정적인페이지 불러오는것. 추후 변동예정
app.use(express.static(path.join(__dirname, 'build')));
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});



app.listen(PORT, () => {
    console.log(`server run : http://localhost:${PORT}/`)
})