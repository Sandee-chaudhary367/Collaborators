const io=require("socket.io")(8900,{
    cors:{
        origin:"http://localhost:3000",
    }
});
let users=[];

const addUser = (userData, socketId) => {
    !users.some((user) => user.userId === userData.userId) &&
      users.push({ userId:userData.userId, socketId ,taskId:userData.taskId});
  };
  
  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };

  const getUser = (userId,taskId) => {
    return users.find((user) => user.userId === userId && user.taskId==taskId);
  };

io.on("connection", (socket) => {
  //when connect
  console.log("a user connected.");
  console.log(users)
  
  //take userId and socketId from user
  socket.on("addUser", (userData) => {
    addUser(userData, socket.id);
    console.log(users)
  });


    //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text, taskId }) => {
      console.log({senderId
      ,receiverId,
      text,
      taskId});
      console.log(users)
      receiverId.forEach(element => {
        let user = getUser(element,taskId);
        console.log(user)
        if(user){
          io.to(user.socketId).emit("getMessage", {
            senderId,
            text,
            
          });
        }
      });
    });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
  });
});
