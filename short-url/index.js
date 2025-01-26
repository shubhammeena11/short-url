const express = require ("express");
const urlRoute = require ("./routes/url");
const { connectMongoDb } = require("./connection");

const app = express();
const PORT = process.env.PORT || 8001;

app.use(express.json());
const cors = require('cors');
app.use(cors());

connectMongoDb("mongodb+srv://user1:qwertyuiop@cluster.mheoc.mongodb.net/?retryWrites=true&w=majority&appName=cluster")
// mongodb://127.0.0.1:27017/shorturl
.then(()=>console.log("MongoDB connected Successful"))
.catch((err)=>console.log("Error in connection mongoDB",err))

app.use("/", urlRoute)
app.listen(PORT,()=>console.log("server started at PORT :",PORT))