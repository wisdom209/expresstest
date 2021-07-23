const jwt = require("jsonwebtoken")

const createAccessToken = (email) => {
    let token = "none"

    token = jwt.sign(email, "my secret", {
        expiresIn: "10hrs"
    })

    return token
}


const verifyAccessToken = (token) => {
    try{
       return jwt.verify(token, "my secret")
    }catch(e){
        return false
    }
    
}

module.exports = {
    createAccessToken, verifyAccessToken
}