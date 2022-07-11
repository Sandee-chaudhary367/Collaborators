const express = require("express");
require('dotenv').config();
require('./db/mongoose')
userRoutes=require("./routes/user_routes")
taskRoutes=require("./routes/task_routes")
requestRoutes=require("./routes/request_routes")
messageRoutes=require("./routes/message_routes")
subTaskRoutes=require("./routes/subtask_routes")
documentRoutes=require("./routes/documents_routes")
logRoutes=require("./routes/logs_routes")
const task = require('./models/task');
const app = express();
var multer = require('multer');
const cors = require("cors");
const auth=require("./middleware/auth");
const user = require('./models/user');
const { db } = require("./models/user");
var corsOptions = {
    origin:"https://deep-collaborators.herokuapp.com/"
}
app.use(cors(corsOptions));
const PORT = process.env.PORT || 3001;
app.use(express.urlencoded({ extended: true })); 
app.use(express.json())
app.use(userRoutes);
app.use(taskRoutes);
app.use(subTaskRoutes);
app.use(requestRoutes);
app.use(messageRoutes);
app.use(documentRoutes);
app.use(logRoutes);

var express = require('express');  
var router = express.Router();
router.get("",(req,res)=>{
    console.log("Welcome")
    res.send("Welcome");
})

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './Image/')
    },
    filename: (req, file, cb) => {
        cb(null, `${req.user._id}`)
    }
});

let storagefile = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './File/')
    }
    //for now filename is randomly genrated 
});
 
// const fileFilter = (req, file, cb) => {
//   const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
//   if(allowedFileTypes.includes(file.mimetype)) {
//       cb(null, true);
//   } else {
//       cb(null, false);
//   }
// }

let uploadfiles = multer({storage:storagefile});
let upload = multer({storage:storage});


userRoutes.post('/addProfilePic',[auth,upload.single("ProfilePic")],async(req, res) => {
    try{
        await user.updateOne({_id:req.user._id},{$set:{"profilePic":req.file.path}});
        res.send("done")
    }
    catch(e){
        console.log(e);
        res.status(400).send(e);
    }          
});

taskRoutes.post('/addFile',uploadfiles.single("myFile"),async(req, res) => {
    try{
        
        console.log(req.file);
        let obj= await task.findByIdAndUpdate(req.body._id, {$push:{document:req.file.path}},{useFindAndModify: false});
        obj.document.push(req.file.path);
        console.log(obj);
        res.send(obj);
    }
    catch(e){
        console.log(e);
        res.status(400).send(e);
    }          
});

// if(process.env.NODE_ENV=="production"){
//   app.use(express.static("collab-frontend/build"));
// }

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
