const express = require("express");
require('./db/mongoose')
userRoutes=require("./routes/user_routes")
taskRoutes=require("./routes/task_routes")
const app = express();
const cors = require("cors");
var corsOptions = {
     origin:"https://deep-collaborators.herokuapp.com/"
}
app.use(cors(corsOptions));
const PORT = process.env.PORT || 3001;
app.use(express.urlencoded({ extended: true })); 
app.use(express.json())
app.use(userRoutes);
app.use(taskRoutes);

if(process.env.NODE_ENV=="production"){
  app.use(express.static("collab-frontend/build"));
}

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});