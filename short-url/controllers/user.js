const User = require("../models/user")

async function createUser(req, res){
    const {name, email, password} = req.body; 
    await User.create({
        name : name,
        email : email,
        password : password,
    })
    res.redirect("/app")
}

async function logoinUser(req, res){
    const {email, password} = req.body; 
    const user = await User.create({email, password});
    if(!user){
        return res.render("/login",{
            error : 'Invalid Username or Password',
        })
    }
    res.redirect("/app")
}

module.exports ={
    createUser,
    logoinUser
}