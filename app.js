const express = require("express")
const methodoverride = require("method-override")

const app = express()
const mongoose = require("mongoose")
const router = require("./route/siteRoutes")
const cookieParser = require("cookie-parser")

app.use(cookieParser())
app.use(methodoverride("_method"))
app.use(express.urlencoded())

app.set('view engine', 'ejs')


app.listen(7700, () => {
    console.log("app listening on port 7700")
})

const dburl = "mongodb://localhost:27017/test"

mongoose.connect(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("connected to db")

    app.use(router)

}).
catch (e => {
    console.log(e)
}) 