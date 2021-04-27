// load env variables

const dotenv = require("dotenv");
dotenv.config({path:"./config/config.env"});
const path = require("path");
const express = require("express");
const cors = require("cors");
require("./config/db");

const app = express();
app.use(express.json());
app.use(cors());
// use express


app.get("/",(req,res)=>{
    res.send({message:"Welcome to invitation portal"});
})


const PORT = process.env.PORT || 5000;
app.listen(PORT,console.log(`Server is running on port ${PORT} ...`))