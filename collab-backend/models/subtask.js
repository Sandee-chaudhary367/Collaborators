const mongoose=require("mongoose");

const subTaskSchema=new mongoose.Schema( {
    description:{
        type:String,
        required:true,
        trim:true
    },
    taskId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"task"
    },
    completion:{type:Boolean,default:false},
    start:{type:Date},
    end:{
        type:Date
    }
},{
    timestamps:true
})

const subTask = mongoose.model('subTask',subTaskSchema);
module.exports=subTask;