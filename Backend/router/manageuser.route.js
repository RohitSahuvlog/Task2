const Router = require("express")
const { Schema } = require("mongoose")
 const managerouter = Router()
 const {manageschema} = require("../modules/manageuser.module")
 const {authentication} =require("../middlewares/authentication")
 managerouter.get("/get",async(req,res)=>{
    const {userID} = req.body
const managedata = await manageschema.find()
res.send(managedata)

 })
 managerouter.get("/get/:ID",async(req,res)=>{
    const {ID} = req.params

const managedata = await manageschema.find({userID:ID})

res.send(managedata)

 })
 managerouter.post("/post",async(req,res)=>{
const {username,email,password,userID} =req.body



let manageuser = new manageschema({

    username,
    email,
    password,
    userID


})


try{

    await manageuser.save()
    res.send({message:"manage data create"})
}
catch{

  
res.send({message:"some went wrong for create manage data "})
}


    
})
managerouter.patch("/change/:ID",authentication,async(req,res)=>{
    const {ID}=req.params

    const {username,email,password,userID} =req.body
   const user = await manageschema.findOneAndUpdate({_id:ID},{username,email,password,userID:userID})
   

   if(user){
    res.send({message:"user update"})
}
else{
    res.send({message:"couldn't update"})
}



    
})
managerouter.delete("/delete/:ID",async(req,res)=>{

   const user = await manageschema.findOneAndDelete({userID:req.params.ID})
   

   if(user){
    res.send({message:"delete",status:true})
}
else{
    res.send({message:" not delete",status:false})
}

    
})

module.exports = {
    managerouter
}