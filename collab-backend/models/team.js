const mongoose=require("mongoose");

const teamSchema=new mongoose.Schema( {
    Name:{
        type:String,
        trim:true
    },
    motive:{
        type:String,
        required:true,
        trim:true
    },
    members:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }],
    document:[Buffer],
    link:[String]
},{
    timestamps:true
})

const task = mongoose.model('task',taskSchema);
module.exports=task
