const { response, request } = require("express");
const express = require("express");
const Messagerouter = express.Router();

const conn = require("../config/DBConfig.js");

// 1. app.js 미들웨어 등록
// 2. DB정보등록(conn)

// 홈
Messagerouter.get("/Message", (request, response) => {
    
    // 현재 로그인한 사람에게 온 메시지를 검색
    let sql = "select * from web_message where rec = ?"

    if(request.session.user){
        conn.query(sql, [request.session.user.email], (err, row) => {
            console.log(row);
            
            response.render("message", {
                user : request.session.user,
                row_name : row
            });
        });
    } else {
        response.render("message", {
            user : request.session.user
        });
    }
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


// 로그아웃
Messagerouter.get("/MessageLogout", (request, response) => {

    delete request.session.user;

    response.redirect("http://127.0.0.1:3001/Message");
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

            response.redirect("http://127.0.0.1:3001/Message");
            // response.render("message", {
            //     user : request.session.user
            // });
        } else if(row.length == 0) {
            // 로그인 실패
            console.log("로그인 실패");
            // response.redirect("http://127.0.0.1:5500/mynodejs/public/ex05LoginF.html"); 
        }
    })
});


// update.ejs로 랜더링
Messagerouter.get("/MessageUpdate", (request, response) => {
    
    // update.ejs파일을 랜더링
    response.render("update", {
        user : request.session.user
    });

});


// 정보 수정
Messagerouter.post("/MessageUpdateExe", (request, response) => {
    
    let email = request.session.user.email;   // session에서 가져와야함, update.ejs에서 받아오는게 없기때문에
    let pw = request.body.pw;
    let tel = request.body.tel;
    let address = request.body.address;

    // 사용자가 입력한 pw, tel, address로 email의 정보를 수정하시오.

    let sql = "update web_member set pw=?, tel=?, address=? where email=?";

    conn.query(sql, [pw, tel, address, email], (err, row) => {
        if(!err){
            console.log("수정성공 : " + row);
            
            request.session.user = {    // 수정된 내용이 session에 덮어쓰여짐
                "email" : email,
                "tel" : tel,
                "address" : address 
            }

            response.redirect("http://127.0.0.1:3001/Message");
        } else {
            console.log("수정실패 : " + err);
        }
    })
});


// 회원정보관리
Messagerouter.get("/MessageMemberSelect", (request, response) => {
    
    let sql = "select * from web_member";
    
    conn.query(sql, (err, row) => {
        if(err) {
            console.log("검색 실패 : " + err);
        } else if(row.length > 0) {
            console.log(row);

            response.render("selectMember", {
                row_name : row,
            })
        } else if(row.length == 0) {
            // 검색된 데이터가 없을 때
            response.redirect("http://127.0.0.1:3001/Message"); 
        }
    })
});


// 회원삭제
Messagerouter.get("/MessageDelete", (request, response) => {

    let email = request.query.email;

    let sql = "delete from web_member where email = ?";

    conn.query(sql, [email], (err, row) => {
        if(!err){
            console.log("입력성공 : " + row);
            response.redirect("http://127.0.0.1:3001/MessageMemberSelect");
        } else {
            console.log("입력실패 : " + err);
        }
    })
});


// 메시지입력
Messagerouter.post("/MessageSend", (request, response) => {
    
    let send = request.body.send;
    let rec = request.body.rec;
    let content = request.body.content;
    
    let sql = "insert into web_message(send, rec, content, send_date) values(?, ?, ?, now())";

    conn.query(sql, [send, rec, content], (err, row) => {
        if(!err){
            console.log("입력성공 : " + row);
            response.redirect("http://127.0.0.1:3001/Message");
        } else {
            console.log("입력실패 : " + err);
        }
    })
});


module.exports = Messagerouter;