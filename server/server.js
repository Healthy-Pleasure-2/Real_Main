//express 모듈 호출

const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 4000;


app.use(express.static(path.join(__dirname, 'build')));
//http://Localhost:4000/ 으로 접속 시 응답 메시지 출력
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});



app.listen(PORT, () => {
    console.log(`server run : http://localhost:${PORT}/`)
})