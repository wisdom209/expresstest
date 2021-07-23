const Person = require("../model/Person.js")
const {
    verifyAccessToken, createAccessToken
} = require("../helper/jwtHelper.js")

const bcrypt = require("bcryptjs")


const signup_get = (req, res) => {
    res.render("signup", {
        title: "Sign Up"
    })
}

const login_get = (req, res) => {
    res.render("login", {
        title: "Login"
    })
}



const signup_post = (req, res) => {

    let {
        email,
        password
    } = req.body

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            console.log(err)
        } else {

            password = hash

            const person = new Person({
                email,
                password
            })

            person.save().then(data => {
                // sign jwt
                const token = createAccessToken({
                    email
                })

                res.cookie("jwt", token, {
                    maxAge: 300000,
                    httpOnly: true
                })

                res.redirect("/")

            }).
            catch (e => {
                if (e.code == 11000) {
                    res.json({
                        error: "email must be unique"
                    })
                }

            })

        }
    })


}

const login_post = async(req, res) => {

    let {
        email,
        password
    } = req.body

    Person.findOne({
        email
    }).then((data) => {

        bcrypt.compare(password, data.password).then((same) => {

            //sign jwt
            if(same){
                 console.log(data.password, password, same)
            let token = createAccessToken({
                email
            })
           res.cookie("jwt", token, {
                maxAge: 1000*60*60*10,
                httpOnly: true
            })
           
            res.redirect("/")
            }else{
                
                console.log("password incorrect")
            res.cookie("jwt", "", {
                maxAge: 10,
                httpOnly: true
            })
           
            res.redirect("/login")
            }
           
        }).
        catch (e => {
           
            console.log("password incorrect")
            res.cookie("jwt", "", {
                maxAge: 10,
                httpOnly: true
            })
           
            res.redirect("/login")
        })

    }).
    catch (e => {
        res.redirect("/login")
    })


}


const logout = (req, res) => {
    console.log("here in logput controller")
    res.cookie("jwt", "", {
        maxAge: 10,
        httpOnly: true
    })
   
    res.redirect("/")
}

module.exports = {
    signup_get,
    login_get,
    signup_post,
    login_post,
    logout
}