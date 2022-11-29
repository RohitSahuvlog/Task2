const express = require("express")
const cors = require("cors")
const  {connection} = require("./config/db")
const {userrouter} = require("./router/authuser.route")
const {authentication} =require("./middlewares/authentication")
const {managerouter} = require("./router/manageuser.route")
const app = express()
app.use(express.urlencoded({extended:true}))
require("dotenv").config()
app.use(express.json())
app.use(cors())
PORT =   process.env.PORT|| 8000


app.use("/auth",userrouter)
app.use(authentication)
app.use("/manage",managerouter)
app.get("/",(req,res)=>{
    res.send("Home page")
})

app.listen(PORT,async(req,res)=>{


    try{
await connection
console.log("connect to mongodb")

    }
    catch{

        console.log(" error connect to mongodb") 
    }

    console.log(`server is start at ${PORT}`);
})