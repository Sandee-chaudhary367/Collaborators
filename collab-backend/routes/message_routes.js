const express = require('express');
const router=new express.Router();
const Message = require('../models/message');

  router.post("/sendmessages", async (req, res) => {
    const newMessage = new Message(req.body);
    console.log(newMessage);
    try {
      const savedMessage = await newMessage.save();
      res.status(200).json(savedMessage);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
  //get
  
  router.get("/messages/:taskId", async (req, res) => {
    try {
      const messages = await Message.find({
        taskId: req.params.taskId,
      });
      res.status(200).json(messages);
    } catch (err) {
      res.status(500).json(err);
    }
  }); 

module.exports = router;