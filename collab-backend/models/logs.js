const mongoose=require("mongoose");

const logSchema=new mongoose.Schema( {
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    },
    logs:[
        {
            subtask_Id:{
                type:mongoose.Schema.Types.ObjectId,
                required:true,
                ref:"subtasks"
            },
            user_Id:{
                type:mongoose.Schema.Types.ObjectId,
                required:true,
                ref:"user"
            },
            taskId:{
                type:mongoose.Schema.Types.ObjectId,
                required:true,
                ref:"tasks"
            },
            createdAt:{
                type:Date,
                required:true
            },
            message:{
                type:String,
                required:true,
                trim:true
            }
              
        }
    ]
})

const log = mongoose.model('log',logSchema);
module.exports=log
