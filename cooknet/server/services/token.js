'use strcit'

const jwt=require('jwt-simple')
const moment=require('moment')

function createToken(user){
    const payload={
        sub: user.user,
        iat: moment().unix(),
        exp:moment().add(14,'days').unix()
    }

    return jwt.encode(payload,'secret')
}

function decodeToken(token){
    const decoded=new Promise((resolve,reject)=>{
        try{
            const payload=jwt.decode(token,'secret')
            if(payload.exp < moment().unix()){
                reject({
                    status:401,
                    message:'Token expired'
                })
            }

            resolve(payload.sub)
        } catch(err){
            reject({
                status:500,
                message: 'Invalid Token'
            })
        }
    })
    return decoded
}
module.exports={createToken,decodeToken}