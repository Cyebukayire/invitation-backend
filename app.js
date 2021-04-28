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

// importing routes
const UserRoutes = require('./routes/user.routes');


app.get("/",(req,res)=>{
    res.send({message:"Welcome to invitation portal"});
});
app.use("/api/v1/user",UserRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT,console.log(`Server is running on port ${PORT} ...`))