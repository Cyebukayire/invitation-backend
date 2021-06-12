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
const workRoutes = require('./routes/workspace.routes');
const allRoutes = require('./routes/allroutes.routes');


app.get("/",(req,res)=>{
    res.send({message:"Welcome to invitation portal"});
});
app.use("/api/v1/user",UserRoutes);
app.use("/api/v1/workspace",workRoutes);
app.use("/api/v1",allRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT,console.log(`Server is running on port ${PORT} ...`))