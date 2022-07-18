const { Router } = require("express");
var express =require("express");
var path = require("path");
var router = express.Router();

var session;

router.get("/aboutUs", function(req, res){
    res.sendFile(path.resolve("pages/about.html"));
})


module.exports=router;
