const mongoose = require("mongoose");

const taskSchema  = new mongoose.Schema({
    title: {
    type: String,
    trim :true,
    minlength: 3
},
_listId: {
    type:mongoose.Types.ObjectId,
    required: true
},
completed: {
    type: Boolean,
    default: false,
    required:true
}

})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task