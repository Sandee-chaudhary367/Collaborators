const express = require('express');
const router=new express.Router();
const auth = require("../middleware/auth");
const request = require('../models/request');

router.post("/addRequest",auth,async(req,res)=>{
    try{
     let newRequest=req.body;
     newRequest.Requester=req.user._id;
     newRequest.RequesterName=req.user.name;
    //  console.log(newRequest);
     let newRequestReturnableobj=new request(newRequest);
    await newRequestReturnableobj.save();
    res.json(newRequestReturnableobj);
    }catch(e){
        console.log(e);
        res.status(400).send(e);
    }
});

router.delete("/deleteRequest",auth,async(req,res)=>{
    try{
     let _id=req.body._id;
     console.log(req.body);
     await request.deleteOne({_id:_id});
     res.send("Done");
    }catch(e){
        console.log(e);
        res.status(400).send(e);
    }
});

router.delete("/deleteRequest2",auth,async(req,res)=>{
    try{
     let Requester=req.body.Requester;
     let Approver=req.body.Approver;
     await request.deleteOne({Requester,Approver});
     res.send("Done");
    }catch(e){
        console.log(e);
        res.status(400).send(e);
    }
});

router.get("/alreadyReceived/:_id",auth,async(req,res)=>{
    try{
        const _id=req.user._id
        const Person_id=req.params._id;
        const myRequest=await request.findOne({
            "Approver": _id,Type:"FRIEND_REQUEST","Requester":Person_id
        });
        // console.log("alreadyRequested");
        // console.log(myRequest);
        res.json(myRequest);
    }catch(e){
        console.log(e);
        res.status(400).send(e);
    }
});

router.get("/alreadySent/:_id",auth,async(req,res)=>{
    try{
        const _id=req.user._id
        const Person_id=req.params._id;
        const myRequest=await request.findOne({
            "Approver": Person_id,Type:"FRIEND_REQUEST","Requester":_id
        });
        // console.log("alreadySent");
        // console.log(myRequest);
        res.json(myRequest);
    }catch(e){
        console.log(e);
        res.status(400).send(e);
    }
});

router.get("/myRequest",auth,async(req,res)=>{
    try{
        const _id=req.user._id
        const myRequest=await request.find({
            "Approver": _id,Type:"FRIEND_REQUEST"
        });
        // console.log("myRequest");
        // console.log(myRequest);
        res.json(myRequest);
    }catch(e){
        console.log(e);
        res.status(400).send(e);
    }
});

router.get("/mySent",auth,async(req,res)=>{
    try{
        const _id=req.user._id
        const mySent=await request.find({
            "Requester": _id,Type:"FRIEND_REQUEST"
        });
        // console.log("mySent");
        // console.log(mySent);
        res.json(mySent);
    }catch(e){
        console.log(e);
        res.status(400).send(e);
    }
});


module.exports=router



