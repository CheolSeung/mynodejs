const express = require("express");  // 설치된 express 사용 선언 
const app = express();   // express실행 app변수에 대입

const router = require("./router/router.js");
const DBrouter = require("./router/DBrouter.js");
const EJSrouter = require("./router/EJSrouter.js");
const bodyparser = require("body-parser");

let ejs = require("ejs");

app.set("view engine", "ejs");
// set은 nodejs가 이미 가지고 있는 속성, use는 가져다 쓰겠다.

// 순서 중요! bodyparser 먼저
app.use(bodyparser.urlencoded({extended:false}));  // post방식일때 body영역을 분석해주는 미들웨어로 bodyparser등록
app.use(router);  // 미들웨어로 router등록
app.use(DBrouter);
app.use(EJSrouter);
app.listen(3001);  // 현재 서버파일의 port번호설정