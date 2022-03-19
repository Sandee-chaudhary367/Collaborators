const express = require('express');
const router=new express.Router();
const subTask=require("../models/subtask")
const auth = require("../middleware/auth");

router.post("/addSubtask",auth,async(req,res)=>{
    try{
        //console.log(req.body);
        let newsubTaskobj=new subTask(req.body);
        await newsubTaskobj.save();
        res.json(newsubTaskobj);
    }catch(e){
        console.log(e);
        res.status(400).send(e);
    }
})

router.get("/myAllsubTasks/:_id",auth,async(req,res)=>{
    try{
    const _id=req.params._id
    const userAllTasks=await subTask.find({
       "taskId" : _id
    });
    res.json(userAllTasks);
    }catch(e){
        console.log(e);
        res.status(400).send(e);
    }
});

router.put("/subTasksCompletionToTrue/:_id",auth,async(req,res)=>{

   subTask.findByIdAndUpdate(req.params._id,{completion:true,end:new Date()},function(err,result){
       if(err){
           console.log(err);
           res.status(400).send(err);
       }else{  
        res.send("Done");
       }
   });
    
})

router.put("/subTasksCompletionToFalse/:_id",auth,async(req,res)=>{
    


    subTask.findByIdAndUpdate(req.params._id,{completion:false,end:null},function(err,result){
        if(err){
            console.log(err);
            res.status(400).send(err);
        }else{
         console.log(result); 
         let aa=result.end; 
         res.json({end:aa});
        }
    });
     
 })
 
 router.delete("/deleteSubTasks/:_id",auth,async(req,res)=>{
    try{
      console.log(req.params._id)
     let task_id=req.params._id;
     await subTask.deleteOne({_id:task_id});
     res.send("Done");
    }catch(e){
        console.log(e);
        res.status(400).send(e);
    }
});


module.exports=router
