const express = require('express');
const router=new express.Router();
const auth = require("../middleware/auth");
const log=require("../models/logs");
const task=require("../models/task");

router.post("/addlog",auth,async(req,res)=>{
    try{
         const Tasks=await task.find({
            _id : req.body.taskId
         });

       

        Tasks[0].partner.forEach(async function findLog(id){
            await log.findOneAndUpdate(
                {user:id}, 
                {$push:{logs:req.body}},
            );    
        })
        
        await log.findOneAndUpdate(
            {user:Tasks[0].owner}, 
            {$push:{logs:req.body}},
        );  

         res.send();
    }catch(e){
        console.log(e);
        res.status(400).send(e);
    }
});

router.get("/returnlog",auth,async(req,res)=>{
    try{
         let obj=await log.find({
            user:req.user._id
         })
         res.send(obj[0]);
    }catch(e){
        console.log(e);
        res.status(400).send(e);
    }
});


module.exports=router



