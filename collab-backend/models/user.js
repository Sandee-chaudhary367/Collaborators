const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");

const userSchema=new mongoose.Schema( {
    name: {
        type: String,
        required: true,
        trim: true
    },
    designation:{
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique:true,
        required: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
       
    },
    age: {
        type: Number,
        default: 0,
    },
    phone_No:{
        type: Number,
        required:true
    },
    friends:[{type:mongoose.Schema.Types.ObjectId,ref:'user'}],
    // team_tasks:[{type:mongoose.Schema.Types.ObjectId,ref:'task'}],
    heatmap:[[Number]],
    profilePic:String,
    document:[[String]]
},{
    timestamps:true
});

userSchema.methods.toJSON=function(){
    const user=this;
    const userObject=user.toObject();
    delete userObject.password;
    return userObject;
}

userSchema.methods.generateAuthToken= async function(){
    const user=this;
    const token=jwt.sign({_id:user._id.toString()},"collab",{expiresIn:"1 day"});
    return token;
}

const user = mongoose.model('user',userSchema);

module.exports = user
