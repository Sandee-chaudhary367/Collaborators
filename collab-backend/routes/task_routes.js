const express = require('express');
const router=new express.Router();
const auth = require("../middleware/auth");
const task = require('../models/task');
const user = require('../models/user');

function getTodayDate() {
    var todayUs = new Date()
    var offset = '+5.5' // since database belongs to US
    var utc = todayUs.getTime() + todayUs.getTimezoneOffset() * 60000 // therefore converting time to IST
    var today = new Date(utc + 3600000 * offset)
    var dd = String(today.getDate()).padStart(2, '0')
    var mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
    var yyyy = today.getFullYear()

    today = yyyy + '-' + mm + '-' + dd
    return today
  }

function addDays(dateObj, numDays) {
    dateObj.setDate(dateObj.getDate() + numDays);
    return dateObj;
 }

    router.post("/updateProgress/",auth,async(req,res)=>{
        try{
        const _id=req.body.taskId
        //console.log(_id);
        const user_id=req.user._id 
        const Task=await task.findOneAndUpdate({_id:_id},{
            completion:req.body.completion});

        res.send()
        }catch(e){
            console.log(e);
            res.status(400).send(e);
        }
    });

router.post("/searchTasks",auth,async(req,res)=>{
    try{
        const _id=req.user._id
        // const searchfield=req.body.searchfield;
        const searchString=req.body.searchString;
        var query = {};
        query["topic"] =searchString;
        const userAllTasks=await task.find({
            $and : [{ $or:[{"owner" : _id},{"partner": _id}]},query]
        });

        res.json(userAllTasks);

    }catch(e){
        console.log(e);
        res.status(400).send(e);
    }
})


router.post("/addTask",auth,async(req,res)=>{
    try{
    const newTask=req.body;
    newTask.owner=req.user._id
    let newTaskReturnableobj=new task(newTask);
    await newTaskReturnableobj.save();
    // let partnerArr=newTaskReturnableobj.partner;
    // for(let i=0;i<partnerArr.length;i++){
    //   let pt= await user.findOne({_id:partnerArr[i]})
    //   if(!pt){
    //       continue;
    //   }
    //   let team_tasks=pt.team_tasks;
    //   team_tasks=[...team_tasks,newTaskReturnableobj._id];
    //   pt.team_tasks=team_tasks;
    //   await pt.save();
    // }
    res.json(newTaskReturnableobj);
    }catch(e){
        console.log(e);
        res.status(400).send(e);
    }
});


router.get("/todayDeadlines/:date",auth,async(req,res)=>{
    let a = req.params.date.split("-");
    let TodayAt12AM = new Date(parseInt(a[0]),parseInt(a[1])-1,parseInt(a[2]))
    let TomorrowAt12AM = new Date(parseInt(a[0]),parseInt(a[1])-1,parseInt(a[2])+1)
 
    try {
        const _id=req.user._id 
        const userAllTasks=await task.find({
            $and : [{ $or:[{"owner" : _id},{"partner": _id}]},{deadline:{$gte:TodayAt12AM, $lte:TomorrowAt12AM }}]
        });

        res.send(userAllTasks)      
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
})

router.get("/DeadlinesByDate",auth,async(req,res)=>{
   
    let a = getTodayDate().split("-");
    let TodayAt12AM = new Date(parseInt(a[0]),parseInt(a[1])-1,parseInt(a[2]))
    let TomorrowAt12AM = new Date(parseInt(a[0]),parseInt(a[1])-1,parseInt(a[2])+1)
 
    try {
        const _id=req.user._id 
        const userAllTasks=await task.find({
            $and : [{ $or:[{"owner" : _id},{"partner": _id}]},{deadline:{$gte:TodayAt12AM, $lte:TomorrowAt12AM }}]
        });

        res.send(userAllTasks)      
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
})

router.get("/TaskbyId/:_id",auth,async(req,res)=>{
    try{
    const _id=req.params._id
    const user_id=req.user._id 
    const userTask=await task.findOne({
        $and:[{_id:_id},{$or:[{"owner" : user_id},{"partner": user_id}]}]
    });
    if(!userTask){
        return;
    }
    res.send(userTask)
    }catch(e){
        console.log(e);
        res.status(400).send(e);
    }
});



router.get("/missedTasks",auth,async(req,res)=>{
    let now = new Date();
    let end = new Date(0);
 
    try {
        const _id=req.user._id 
        const userAllTasks=await task.find({
            $and : [{ $or:[{"owner" : _id},{"partner": _id}]},{deadline:{$gt:end, $lt:now}},{ completion:{$ne:100}}]
        });

        // const userObj=await user.findOne({
        //     _id
        // }).populate('team_tasks')
    
        // let userCollabTask=userObj.team_tasks;
    
        // if(!userAllTasks){
        //     return res.status(404).send("Not Found");
        // }
    
        // for(let i=0;i<userCollabTask.length;i++){
        //     let aa=new Date(userCollabTask[i].deadline.toJSON());
        //     let time=aa.getTime();
        //     let completed=userCollabTask[i].completion===100
        //     if(time<=now.getTime() && completed){ 
        //         userAllTasks.push(userCollabTask[i]); 
        //     }
        // }
        
    res.send(userAllTasks)    
        
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
})


router.get("/tasksCloseToDeadline",auth,async(req,res)=>{
    let now = new Date();
    let nextWeek = addDays(new Date(), 10);
 
    try {
        const _id=req.user._id 
        const userAllTasks=await task.find({
            $and : [{ $or:[{"owner" : _id},{"partner": _id}]},{deadline:{$gt:now, $lt:nextWeek}}]
        });

        // const userObj=await user.findOne({
        //     _id
        // }).populate('team_tasks')
    
        // let userCollabTask=userObj.team_tasks;
    
        // if(!userAllTasks){
        //     return res.status(404).send("Not Found");
        // }
    
        // for(let i=0;i<userCollabTask.length;i++){
        //     let aa=new Date(userCollabTask[i].deadline.toJSON());
        //     let time=aa.getTime();
        //     if(time>=now.getTime() && time<=nextWeek.getTime()){ 
        //     userAllTasks.push(userCollabTask[i]); 
        //     }
        // }
        
    res.send(userAllTasks)    
        
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
})

router.get("/myAllTasks",auth,async(req,res)=>{
    try{
    const _id=req.user._id
    const userAllTasks=await task.find({
        $or:[{"owner" : _id},{"partner": _id}]
    });

    // const userObj=await user.findOne({
    //     _id
    // }).populate('team_tasks')

    // let userCollabTask=userObj.team_tasks;

    // if(!userAllTasks){
    //     return res.status(404).send("Not Found");
    // }

    // for(let i=0;i<userCollabTask.length;i++){
    //    userAllTasks.push(userCollabTask[i]); 
    // }

    res.send(userAllTasks)
    
    }catch(e){
        console.log(e);
        res.status(400).send(e);
    }
});

router.get("/myTasksonly",auth,async(req,res)=>{
    try{
    const _id=req.user._id
    const userAllTasks=await task.find({
        "owner" : _id
    });
  
    res.send(userAllTasks)
    
    }catch(e){
        console.log(e);
        res.status(400).send(e);
    }

});

router.get("/collabTasks",auth,async(req,res)=>{
    try{
    const _id=req.user._id
    const userAllTasks=await task.find({
        "partner": _id
    });

    res.send(userAllTasks)
    
    }catch(e){
        console.log(e);
        res.status(400).send(e);
    }
});

router.delete("/deleteTasks/:_id",auth,async(req,res)=>{
    try{
     let task_id=req.params._id;
     await task.deleteOne({_id:task_id});
     res.send("Done");
    }catch(e){
        console.log(e);
        res.status(400).send(e);
    }
});


module.exports=router