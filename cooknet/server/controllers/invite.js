'use strcit'
function inviteUser(req,res){
    res.send({message:"the user was invited by email"})
}

module.exports={
    inviteUser
}