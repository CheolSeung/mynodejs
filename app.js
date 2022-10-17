const express = require("express");  // 설치된 express 사용 선언 
const app = express();   // express실행 app변수에 대입

const router = require("./router/router.js");
const bodyparser = require("body-parser");


// 순서 중요! bodyparser 먼저
app.use(bodyparser.urlencoded({extended:false}));  // post방식일때 body영역을 분석해주는 미들웨어로 bodyparser등록
app.use(router);  // 미들웨어로 router등록
app.listen(3001);  // 현재 서버파일의 port번호설정