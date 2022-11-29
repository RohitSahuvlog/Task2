
const {Schema,model} =require("mongoose")

const manageSchema = new Schema({
username:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password :{type:String,required:true},
    userID:String
  




})

const manageschema = model("manage",manageSchema)

module.exports = {manageschema}