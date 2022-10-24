const { response, request } = require("express");
const express = require("express");
const Messagerouter = express.Router();

const conn = require("../config/DBConfig.js");

// 1. app.js 미들웨어 등록
// 2. DB정보등록(conn)

// 홈
Messagerouter.get("/Message", (request, response) => {
    
    response.render("message", {
        user : request.session.user
    });
});


// 로그아웃
Messagerouter.get("/MessageLogout", (request, response) => {

    delete request.session.user;

    response.redirect("http://127.0.0.1:3001/Message");
});


// 회원가입
Messagerouter.post("/MessageJoin", (request, response) => {
    
    let email = request.body.email;
    let pw = request.body.pw;
    let tel = request.body.tel;
    let address = request.body.address

    let sql = "insert into web_member values(?, ?, ?, ?, now())";

    conn.query(sql, [email, pw, tel, address], (err, row) => {
        if(!err){
            console.log("입력성공 : " + row);
            response.redirect("http://127.0.0.1:3001/Message");
        } else {
            console.log("입력실패 : " + err);
        }
    })
});


// 로그인
Messagerouter.post("/MessageLogin", (request, response) => {
    
    let email = request.body.email;
    let pw = request.body.pw;

    let sql = "select * from web_member where email = ? and pw = ?";
    
    conn.query(sql, [email, pw], (err, row) => {
        if(err) {
            console.log("검색 실패 : " + err);
        } else if(row.length > 0) {
            // 로그인 성공
            request.session.user = {
                "email" : row[0].email,
                "tel" : row[0].tel,
                "address" : row[0].address
            };
            
            console.log("session영역에 email저장 성공" + request.session.user);

            response.render("message", {
                user : request.session.user,
            })
        } else if(row.length == 0) {
            // 로그인 실패
            console.log("로그인 실패");
            // response.redirect("http://127.0.0.1:5500/mynodejs/public/ex05LoginF.html"); 
        }
    })
});



module.exports = Messagerouter;