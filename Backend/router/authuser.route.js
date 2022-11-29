const router = require("express")
const { userschema } = require("../modules/authuser.module")
const bycryptjs = require("bcryptjs")
const userrouter = router()
const  jwt =require("jsonwebtoken")

userrouter.post("/signin", (req, res) => {
    const { email, password } = req.body
    console.log(email,password)
    bycryptjs.hash(password, 5, async (err, hash) => {

        if (err) {

            res.send("Something went wrong, plz try again later")
        }
        const user = new userschema({
            email,
            password: hash

        })

        try {
            await user.save()
            res.json({ msg: "Signup successfull" })

        }
        catch {

            res.send("Something went wrong, plz try again error")

        }


    })

})
userrouter.post("/login",async (req, res) => {
    const { email, password } = req.body
   const user =  await userschema.findOne({email})
   console.log(user)
   const hash = user.password
   bycryptjs.compare(password,hash,(error,result)=>{

if(error){
    res.send("credencials is not match")
}
if(result){
const token = jwt.sign({userID:user.userID,email:user.email,password:user.password},process.env.JWT_SECRET)
res.json({message : "Login successfull", token,email,userID:user._id})

}else{
    res.send("Invalid credentials, plz signip if you haven't")
}


   })




})

module.exports = {
    userrouter
}