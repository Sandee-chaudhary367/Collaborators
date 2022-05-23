const mongoose=require("mongoose");

const taskSchema=new mongoose.Schema( {
    topic:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    },
    deadline:{
        type:Date
    },
    completion:{type:Number,default:0},
    partner:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }],
    document:[String],
    link:[String]
},{
    timestamps:true
})

const task = mongoose.model('task',taskSchema);
module.exports=task
