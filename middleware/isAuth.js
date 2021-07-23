const {
    verifyAccessToken, createAccessToken
} = require("../helper/jwtHelper.js")

const isAuth = (req, res, next) => {
    const token = req.cookies.jwt
    console.log("token is")
    const isuser = verifyAccessToken(token)
    console.log(isuser)

        if (isuser) {
            console.log("verified")
            next()
        } else {
            res.redirect("/")
        }

    }

    module.exports = isAuth