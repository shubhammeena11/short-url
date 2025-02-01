const User = require("../models/user")

async function createUser(req, res){
    const {name, email, password} = req.body; 
    await User.create({
        name : name,
        email : email,
        password : password,
    })
}

module.exports ={
    createUser,
}