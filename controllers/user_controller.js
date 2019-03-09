const UserModel = require('../models/user')
const mongoose = require('mongoose')

module.exports = {
    insertUser: (req, res) => {
        let user = new UserModel({
            username: "filla",
            first_name: "Filla",
            last_name: "Dunanti",
            email: "filladunanti@gmail.com",
            password: "gonnafine",
            friends: [
                mongoose.Types.ObjectId("5c82a9c39ac833fcf94a2eec"),
                mongoose.Types.ObjectId("5c82af031b3976059f992f6e")
            ]
        })
        user.save()
            .then(doc => {
                res.json(doc)
                console.log(doc)
            })
            .catch(err => {
                res.json({
                    status: false
                })
                console.log(err)
            })
    },
    getFriends: (req, res) => {
        UserModel.getFriends(mongoose.Types.ObjectId("5c82b0362d09bc0709ee5616"))
            .then(doc => {
                res.json(doc)
                console.log(doc)
            })
            .catch(err => {
                res.json({
                    status: false
                })
                console.log(err)
            })
    }
}