const express = require('express');
const auth = require('../middleware/auth');
const user = require('../models/user');


const router=new express.Router();

router.get("",(req,res)=>{
    console.log("Welcome")
    res.send("Welcome");
})


router.get("/find/:email",auth,async(req,res)=>{
    try{
        console.log(req.params.email)
        const friend=await user.findOne({email:req.params.email});
        
        if(!friend){
            throw new Error();
        }
        let myfriends=req.user.friends;
        let yesFriend=myfriends.find((i)=>{
            console.log(i);
            console.log(friend._id)
            return i.equals(friend._id)});
        console.log(yesFriend)
        if(!yesFriend){
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
    console.log(friend2);
        if(!friend2){
            throw new Error();
        }
    friend2.friends.push(req.user._id);   
    req.user.friends.push(friend2._id);
    await req.user.save();
    await friend2.save();
    res.send("Done")
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