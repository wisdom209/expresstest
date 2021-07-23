const express = require("express")
const siteController = require("../controller/siteController.js")
const userController = require("../controller/userController.js")
const authController = require("../controller/authController.js")
const isAuth = require("../middleware/isAuth.js")

const router = express.Router()


router.get("/", siteController.get_home)

router.get("/about", siteController.get_about)

router.get("/contact", siteController.get_contact)


//protected routes
router.use("/studs", isAuth)
router.use("/create", isAuth)
router.use("/updatestud/:id", isAuth)
router.use("/updatestudput", isAuth)
router.use("/delstud/:id", isAuth)

//user routes

router.post("/create", userController.post_create)

router.get("/studs", userController.get_studs)

router.get("/create", userController.get_create)

router.delete("/delstud/:id", userController.del_stud)

router.get("/updatestud/:id", userController.update_stud_get)

router.put("/updatestudput", userController.update_stud_put)

//auth routes

router.get("/signup", authController.signup_get)
router.get("/login", authController.login_get)
router.post("/signup", authController.signup_post)
router.post("/login", authController.login_post)
router.get("/logout", authController.logout)


//404 page

router.use(siteController.get_404)

module.exports = router