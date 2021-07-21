const mongoose = require('mongoose')
//setup to connect to the database
mongoose.connect(process.env.MONGODB_URL,{
//mongoose.connect('mongodb://127.0.0.1:27017/Collaborators', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
},()=>{console.log("Server started")})

//