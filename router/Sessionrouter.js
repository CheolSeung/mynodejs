const express = require("express");
const Sessionrouter = express.Router();


Sessionrouter.get("/sessionCreate", (request, response) => {

    // session생성
    request.session.user = {
        "id" : "smart",
        "pw" : "123",
        "nick" : "smart"
    };   // session이라는 공간에 user라는 이름으로 코드 안에 값이 들어감

    response.end();
});

Sessionrouter.get("/sessionSelect", (request, response) => {
    
    // session검색
    console.log("session에 있는 user값 : " + request.session.user);

});

Sessionrouter.get("/sessionDelete", (request, response) => {
    
    // session삭제
    delete request.session.user;

    response.end();

});


module.exports = Sessionrouter;