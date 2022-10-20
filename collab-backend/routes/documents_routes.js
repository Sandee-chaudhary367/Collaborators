const express = require('express');
const router=new express.Router();
const auth = require("../middleware/auth");
const document=require("../models/document")
const task=require("../models/task")


router.post("/addDocument",auth,async(req,res)=>{
    try{
    const newDocument=req.body;
    newDocument.uploader=req.user._id;
    newDocument.uploaderName=req.user.name;
    let newDocumentReturnableobj=new document(newDocument);
    await newDocumentReturnableobj.save();
    res.json(newDocumentReturnableobj);
    }catch(e){
        console.log(e);
        res.status(400).send(e);
    }
});

router.get("/documents/:taskId", async (req, res) => {
    try {
      //console.log("hello");
      const docsArr = await document.find({
        task: req.params.taskId,
      });
     // console.log(docsArr);
      res.status(200).json(docsArr);
    } catch (err) {
      res.status(500).json(err);
    }
}); 

router.get("/getDocuments/File/:path",async(req,res)=>{
  try{
     let Imagepath="D:/ReactDevelopment/Collaborators/File/"+req.params.path;
     console.log(Imagepath);
     res.sendFile(Imagepath);
  }catch(e){
      console.log(e);
  }
})

router.get("/userdocuments/:_id", async (req, res) => {
  try {
    
    const _id=req.params._id
   // console.log(_id)
    const docsArr = await document.find({
      $or:[{"owner" : _id},{"partner": _id}]
    });
   //console.log(docsArr);
    res.status(200).json(docsArr);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}); 


module.exports=router