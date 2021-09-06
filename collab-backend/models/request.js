const mongoose=require("mongoose");

const requestSchema=new mongoose.Schema( {
    Type:{
        type:String,
        required:true,
        trim:true
    },
    Requester:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    },RequesterName:{
        type:String,
        required:true,
        trim:true
    },
    Approver:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    },ApproverName:{
        type:String,
        required:true,
        trim:true
    }
},{
    timestamps:true
})

const request = mongoose.model('request',requestSchema);
module.exports=request
