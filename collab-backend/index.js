const express = require("express");
require('./db/mongoose')
userRoutes=require("./routes/user_routes")
taskRoutes=require("./routes/task_routes")
requestRoutes=require("./routes/request_routes")
messageRoutes=require("./routes/message_routes")
subTaskRoutes=require("./routes/subtask_routes")

const app = express();
var multer = require('multer');
const cors = require("cors");
const auth=require("./middleware/auth");
const user = require('./models/user');
const { db } = require("./models/user");
var corsOptions = {
    origin: "http://localhost:3000"
}
app.use(cors(corsOptions));
const PORT = process.env.PORT || 3001;
// app.use("./CollabPics",express.static("upload"));
app.use(express.urlencoded({ extended: true })); 
app.use(express.json())
app.use(userRoutes);
app.use(taskRoutes);
app.use(subTaskRoutes);
app.use(requestRoutes);
app.use(messageRoutes);



var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './Image/')
    },
    filename: (req, file, cb) => {
        cb(null, `${req.user._id}`)
    }
});
 
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if(allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
  } else {
      cb(null, false);
  }
}

let upload = multer({storage});


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

// if(process.env.NODE_ENV=="production"){
//   app.use(express.static("collab-frontend/build"));
// }

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
