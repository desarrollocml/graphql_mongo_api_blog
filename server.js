const express = require("express");

const app = express();

app.get("/", (req,res)=>{
    res.send("Welcome to my graphql api")
})

app.listen(3000);
console.log("server on port 3000");
