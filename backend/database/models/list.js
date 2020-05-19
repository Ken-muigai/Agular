const mongoose = require("mongoose");

const listSchema  = new mongoose.Schema({
    title: {
    type: String,
    trim :true,
    minlength: 3
}

})

const List = mongoose.model('List', listSchema)

module.exports = List