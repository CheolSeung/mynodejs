const express = require("express");
const router = express.Router();  // express가 갖고있는 기능 중에 router기능 사용


router.get("/plus", function(request, response){ // /plus라우터 기능정의 및 등록
    console.log("/plus 라우터호출");
    console.log(parseInt(request.query.num1) + parseInt(request.query.num2));

    response.writeHead(200, {"Content-Type" : "text/html; charset=utf-8"});   // 1번
    response.write("<html>");
    response.write("<body>");
    response.write("응답성공<br>");      // 2번
    response.write("결과값 : " + (parseInt(request.query.num1) + parseInt(request.query.num2)));
    response.write("</body>");
    response.write("</html>");
    response.end();    // 3번
});

router.get("/cal", (request, response) => {  // // /cal라우터 기능정의 및 등록
    // 1. 사용자 입력한 값을 가져오기.
    let num1 = request.query.num1;
    let num2 = request.query.num2;
    let cal = request.query.cal;

    console.log(num1 + cal + num2);

    // 사용자가 입력한 기호에 맞는 연산결과값을 브라우저에 출력하시오.
    response.writeHead(200, {"Content-Type" : "text/html; charset=utf-8"});
    response.write("<html>");
    response.write("<body>");
    if(cal == "+") {
        response.write("결과값 : " + (parseInt(num1) + parseInt(num2)));
    } else if(cal == "-") {
        response.write("결과값 : " + (parseInt(num1) - parseInt(num2)));
    } else if(cal == "*") {
        response.write("결과값 : " + (parseInt(num1) * parseInt(num2)));
    } else if(cal == "/") {
        response.write("결과값 : " + (parseInt(num1) / parseInt(num2)));
    }
    response.write("</body>");
    response.write("</html>");
    response.end(); 
});


// ex03Grade.html
router.post("/Grade", (request, response) => {
    response.writeHead(200, {"Content-Type" : "text/html; charset=utf-8"});
    response.write("<html>");
    response.write("<body>");
    let avg = (parseInt(request.body.java) + parseInt(request.body.web) + parseInt(request.body.iot) + parseInt(request.body.android)) / 4;

    response.write("이름 : " + request.body.name + "<br>");
    response.write("자바 : " + request.body.java + "<br>");
    response.write("웹 : " + request.body.web + "<br>");
    response.write("IoT : " + request.body.iot + "<br>");
    response.write("안드로이드 : " + request.body.android + "<br>");
    response.write("avg : " + 
                (parseInt(request.body.java) + parseInt(request.body.web) + parseInt(request.body.iot) + parseInt(request.body.android)) / 4 + "<br>");
    if(avg >= 95) {
        response.write("A+");
    } else if(avg >= 90 && avg/4 <= 94) {
        response.write("A");
    } else if(avg >= 85 && avg/4 <= 89) {
        response.write("B+");
    } else if(avg >= 80 && avg/4 <= 84) {
        response.write("B");
    } else if(avg >= 75 && avg/4 <= 79) {
        response.write("C");
    } else if(avg < 75) {
        response.write("F");
    }
    response.write("</body>");
    response.write("</html>");
    response.end(); 
});


// ex04Join.html
router.post("/Join", (request, response) => {
    response.writeHead(200, {"Content-Type" : "text/html; charset=utf-8"});
    response.write("<html>");
    response.write("<body>");

    response.write("ID : " + request.body.id + "<br>");
    response.write("NAME : " + request.body.name + "<br>");
    response.write("EMAIL : " + request.body.email + "<br>");
    response.write("TEL : " + request.body.tel + "<br>");
    response.write("GENDER : " + request.body.gender + "<br>");
    response.write("COUNTRY : " + request.body.country + "<br>");
    response.write("BIRTH : " + request.body.birth + "<br>");
    response.write("COLOR : " + request.body.color + "<br>");
    response.write("HOBBY : " + request.body.hobby + "<br>");
    response.write("TALK : " + request.body.talk + "<br>");

    response.write("</body>");
    response.write("</html>");
    response.end(); 
})

//ex05Login.html
// DBrouter.post("/Login", (request, response) => {
    
//     let id = request.body.id;
//     let pw = request.body.pw;

//     // 사용자가 입력한 id가 'smart'이고 pw가 '123' 이였을때
//     // 성공 -> LoginS.html
//     // 실패 -> LoginF.html

//     if (id == 'smart' && pw == '123'){
//         response.redirect("http://127.0.0.1:5500/mynodejs/public/ex05LoginS.html");  //주소값으로 지정해야함
//     } else {
//         response.redirect("http://127.0.0.1:5500/mynodejs/public/ex05LoginF.html");  //주소값으로 지정해야함
//     }
    
// });


module.exports = router;