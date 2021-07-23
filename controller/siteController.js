const axios = require("axios")

const get_home = (req, res) => {
    const endpoint = "https://jsonplaceholder.typicode.com/posts"

    axios.get(endpoint).then((result) => {
        console.log("we got the posts")
        res.render("index", {
            title: "Home",
            posts: result.data
        })
    }).
    catch (e => {
        console.log("jsonplaceholder was not fetched")
        res.render("index", {
            title: "Home",
            posts: []
        })

    })

}


const get_about = (req, res) => {
    res.render("about", {
        title: "About Us"
    })
}


const get_contact = (req, res) => {
    res.render("contact", {
        title: "Our Contact"
    })
}

const get_404 = (req, res) => {
    res.render("404", {
        title: "Error Page"
    })
}

module.exports = {
    get_home, get_about, get_contact, get_404
}