const mongoose = require('mongoose');
const { Schema } = mongoose;

const ToDoSchema = new Schema({
    name:{ type: String, required: true },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',required: true
    },
    removed:{type: Boolean, default: false},
    description: {
        type: String,
        required: true,
    },
    tasks: [{ name:{ type: String, required: true }, dueDate:{type: Date},isDone:{type: Boolean,default: false} }],
},{ timestamps: true });
module.exports = mongoose.model('toDo', ToDoSchema);