const User = require("../model/User.js")


const post_create = (req, res) => {
    const user = new User(req.body)

    user.save().then(result => {
        res.redirect("/studs")
    }).
    catch (e => {
        console.log(e)
        res.redirect("/404")
    })

}


const get_studs = (req, res) => {


    User.find().then((result) => {
					
        res.render("studs", {
            students: result,
            title: "Students"
        })

    }).
    catch ((e) => {

        res.redirect("/404")
    })
}



const del_stud = (req, res) => {
    const id = req.params.id


    User.findByIdAndDelete(id).then((result) => {
        res.json("/studs")
    }).
    catch (e => {
        //console.log(e)
        res.json("/404")
    })
}

const update_stud_get = (req, res) => {
    const id = req.params.id

    User.findById(id).then(result => {
        res.render("updatestud", {
            title: "Update Student",
            result
        })
    }).
    catch (e => {
        res.redirect("/404")
        console.log(e)
    })

}



const update_stud_put = (req, res) => {
    const {
        id, name, department, age
    } = req.body
    const update = {
        name, department, age
    }

    User.findByIdAndUpdate(id, update, {useFindAndModify : false}).then(data => {
        res.redirect("/studs")
    }).
    catch (e => {
        console.log(e)
    })

}


const get_create = (req, res) => {
    res.render("createstud", {
        title: "Add new student"
    })
}


module.exports = {
    post_create,
    get_studs,
    del_stud,
    update_stud_get,
    update_stud_put,
    get_create,
}