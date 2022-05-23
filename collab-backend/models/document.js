const mongoose=require("mongoose");

const documentSchema=new mongoose.Schema( {
    path:{
        type:String,
        required:true,
        trim:true
    },
    uploader:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    },
    uploaderName:{
        type:String,
        required:true,
        ref:"user"
    },
    fileName:{
        type:String,
        required:true,
        trim:true
    },
    type:{
        type:String,
        required:true,
        trim:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    },
    partner:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }],
    task:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"task"
    }
},{
    timestamps:true
})

const document = mongoose.model('document',documentSchema);
module.exports=document
