const express = require("express");
const DBrouter = express.Router();
const conn = require("../config/DBConfig.js");

// 회원가입
DBrouter.post("/JoinDB", (request, response) => {
    
    let id = request.body.id;
    let pw = request.body.pw;
    let nick = request.body.nick;

    let sql = "insert into member values(?, ?, ?)";

    conn.query(sql, [id, pw, nick], (err, row) => {
        if(!err){
            console.log("입력성공 : " + row);
            response.redirect("http://127.0.0.1:3001/Main");
        } else {
            console.log("입력실패 : " + err);
        }
    })
});


// 삭제
DBrouter.get("/Delete", (request, response) => {
    // 회원삭제라우터만들기
    // 1. get방식의 /Delete라우터 생성
    // 2. 사용자가 입력한 id값 가져오기
    // 3. id값을 통해 member테이블에 있는 id값 삭제하기
    // 4. 삭제 성공 후 Main.html로 돌아가기
    let id = request.query.id;

    let sql = "delete from member where id = ?";

    conn.query(sql, [id], (err, row) => {
        if(err){
            console.log("삭제실패 : " + err);
        } else if(row.affectedRows > 0) {
            console.log("명령에 성공한 수 : " + row.affectedRows);
            response.redirect("http://127.0.0.1:3001/Main");
        } else if(row.affectedRows == 0) {
            console.log("삭제된 값이 없습니다.")
        }
    })
});


// 회원 수정
DBrouter.post("/Update", (request, response) => {

    let id = request.body.id;
    let select = request.body.select;  // pw or nick
    let data = request.body.data;   // 변경될 데이터
    
    // set 업데이트할값 where 업데이트 될 컬럼
    let sql = "";
    if (select == "pw") {
        sql = "update member set pw = ? where id = ?"
    } else if (select == "nick") {
        sql = "update member set nick = ? where id = ?"
    }
    // let sql = `update member set ${select} where id = ?`;

    conn.query(sql, [data, id], (err, row) => {
        if(err){
            console.log("수정실패 : " + err);
        } else if(row.affectedRows > 0) {
            console.log("명령에 성공한 수 : " + row.affectedRows);
            response.redirect("http://127.0.0.1:3001/Main");
        } else if(row.affectedRows == 0) {
            console.log("수정된 값이 없습니다.")
        }
    })
});


// 회원 전체 검색
DBrouter.get("/SelectAll", (request, response) => {

    let sql = "select * from member";

    conn.query(sql, (err, row) => {
        if(err) {
            console.log("검색 실패 : " + err);
        } else if(row.length > 0) {
            console.log("검색된 데이터의 수 : " + row.length);
            response.render("SelectAll", {
                row_names : row,
            })
        } else if(row.length == 0) {
            console.log("검색된 데이터가 없습니다.");
        }

    })
});


// 회원 검색
DBrouter.get("/SelectOne", (request, response) => {
    // 회원검색 라우터 만들기
    // 1. get방식의 /SelectOne라우터 생성
    // 2. 사용자가 입력한 id의 정보만 검색해서 브라우저 출력하시오
    let id = request.query.id;    
    let sql = "select * from member where id = ?";
    
    conn.query(sql, [id], (err, row) => {
        if(err) {
            console.log("검색 실패 : " + err);
        } else if(row.length > 0) {
            console.log("검색된 데이터의 수 : " + row.lenght);
            console.log(row);
            
            response.render("SelectOne", {
                row_name : row,
            })
        } else if(row.length == 0) {
            console.log("검색된 데이터가 없습니다.");
        }
    })

});


// 로그인
DBrouter.post("/Login", (request, response) => {
    
    let id = request.body.id;
    let pw = request.body.pw;

    let sql = "select * from member where id = ? and pw = ?";
    
    conn.query(sql, [id, pw], (err, row) => {
        if(err) {
            console.log("검색 실패 : " + err);
        } else if(row.length > 0) {
            // 로그인 성공
            request.session.user = id;
            
            console.log("session영역에 id저장 성공" + request.session.user);

            response.render("LoginS", {
                row_id : id,
            })
        } else if(row.length == 0) {
            // 로그인 실패
            response.redirect("http://127.0.0.1:5500/mynodejs/public/ex05LoginF.html"); 
        }
    })
});


// SelectDelete
DBrouter.get("/SelectDelete", (request, response) => {

    let id = request.query.id;

    let sql = "delete from member where id = ?";

    conn.query(sql, [id], (err, row) => {
        if(err){
            console.log("삭제실패 : " + err);
        } else if(row.affectedRows > 0) {
            console.log("명령에 성공한 수 : " + row.affectedRows);
            response.redirect("http://127.0.0.1:3001/SelectAll");
        } else if(row.affectedRows == 0) {
            console.log("삭제된 값이 없습니다.")
        }
    })
});


// 홈
DBrouter.get("/Main", (request, response) => {
    
    response.render("Main", {
        id : request.session.user    // Main.ejs로 보냄
    })
});


// 로그아웃
DBrouter.get("/Logout", (request, response) => {
    
    delete request.session.user;

    response.render("Main", {
        id : request.session.user    // Main.ejs로 보냄
    })
});

module.exports = DBrouter;