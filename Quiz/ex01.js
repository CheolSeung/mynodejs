const { request, response } = require("express");
const express = require("express");
const ex01router = express.Router();

ex01router.get("/ex01", (request, response) => {
    
    let season = request.query.season
    let name = request.query.name

    response.render("ex01", {
        season : season,
        name : name
    })
})



module.exports = ex01router;