const mongoose=require("mongoose");

const messageSchema=new mongoose.Schema( {
    taskId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"task"
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    },
    text:{
        type:String,
        required: true,
        trim: true
    }

},{
    timestamps:true
})

const task = mongoose.model('message',messageSchema);
module.exports=task
