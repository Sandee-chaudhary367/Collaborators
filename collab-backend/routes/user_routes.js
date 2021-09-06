const express = require('express');
const auth = require('../middleware/auth');
const user = require('../models/user');
const upload=require("../index");

const router=new express.Router();


router.get("/getProfilepic/Image/:path",async(req,res)=>{
    try{
       let Imagepath="D:/ReactDevelopment/Collaborators/Image/"+req.params.path;
       console.log(Imagepath);
       res.sendFile(Imagepath);
    }catch(e){
        console.log(e);
    }
})

router.get("/find/:email",auth,async(req,res) => {
    try{
        // console.log(req.params.email)
        const friend=await user.findOne({email:req.params.email});
        
        if(!friend){
            throw new Error();
        }
        let myfriends=req.user.friends;
        let yesFriend=myfriends.find((i)=>{
            console.log(i);
            console.log(friend._id)
            return i.equals(friend._id)});
        // console.log(yesFriend)
        if(!yesFriend){
            throw new Error();
        }
        res.json(friend);
    }catch(e){
        console.log(e);
        res.status(400).send(e);
    }
})

router.get("/minInfo/:_id",auth,async(req,res)=>{
    try{
        const friend=await user.findOne({_id:req.params._id},{ _id: 1, name: 1 });
        
        if(!friend){
            throw new Error();
        }
     
        res.json(friend);
    }catch(e){
        console.log(e);
        res.status(400).send(e);
    }
})



router.get("/minInfoemail/:email",auth,async(req,res)=>{
    try{
        // console.log(req.params.email)
        const friend=await user.find({email:req.params.email},{ _id: 1, name: 1 });
        
        if(!friend){
            throw new Error();
        }
     
        res.json(friend);
    }catch(e){
        console.log(e);
        res.status(400).send(e);
    }
})

router.get("/profile/:_id",async(req,res)=>{
    try{
        // console.log(req.params._id)
        const friend=await user.findOne({_id:req.params._id});
        if(!friend){
            throw new Error();
        }
     
        res.json(friend);
    }catch(e){
        console.log(e);
        res.status(400).send(e);
    }
})


router.get("/myProfile",auth,(req,res)=>{
    try{
        res.json(req.user);
    }catch(e){
        console.log(e);
        res.status(400).send(e);
    }
})

router.post("/addFriend",auth,async (req,res)=>{
    try{
    const friend2=await user.findOne({_id:req.body._id});
    // console.log(friend2);
        if(!friend2){
            throw new Error();
        }
    friend2.friends.push(req.user._id);   
    req.user.friends.push(friend2._id);
    await req.user.save();
    await friend2.save();
    res.json(req.user);
    }catch(e){
        console.log(e);
        res.status(400).send(e);
    }

});

router.post("/unFriend",auth,async (req,res)=>{
    try{
    const friend2=await user.findOne({_id:req.body._id});
    // console.log(friend2);
        if(!friend2){
            throw new Error();
        }
    let a=friend2.friends.findIndex((el)=>el.equals(req.user._id));
    if(a===-1){
        return;
    }
     friend2.friends.splice(a,1);
     let b=req.user.friends.findIndex((el)=>el.equals(friend2._id));
     if(a===-1){
        return;
    }
    req.user.friends.splice(b,1);
    await req.user.save();
    await friend2.save();
    res.json(req.user);
    }catch(e){
        console.log(e);
        res.status(400).send(e);
    }
});



// router.post("/addteamtask",auth,async (req,res)=>{
//     try{
//     req.user.team_tasks=req.body.team_tasks;
//     await req.user.save();
//     res.send("Done")
//     }catch(e){
//         console.log(e);
//         res.status(400).send(e);
//     }

// });


router.post("/login",async(req,res)=>{
    try{
        const loggedUser=await user.findOne({
            email:req.body.email,
            password:req.body.password
        });
        if(!loggedUser){
           return  res.status(404).send("Not Found");
        }
        let token= await loggedUser.generateAuthToken();
        let loggedUserReturnable=loggedUser.toJSON();
        loggedUserReturnable.Token=token;
        res.json(loggedUserReturnable);
    }catch(e){
        console.log(e);
        res.status(400).send(e);
    }
})

router.post("/signup",async(req,res)=>{
    try{
    const userInfo=req.body;
    const newUser=new user(userInfo);
    await newUser.save();
    let token= await newUser.generateAuthToken();
    let newUserReturnable=newUser.toJSON();
    newUserReturnable.Token=token;
    res.json(newUserReturnable);
    }catch(e){
        console.log(e);
        res.status(400).send(e);
    }
})

module.exports=router