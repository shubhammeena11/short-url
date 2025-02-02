const express = require ("express");
const cors = require('cors'); 
require('dotenv').config();
const urlRoute = require ("./routes/url");
const userRoute = require ("./routes/user");
const { connectMongoDb } = require("./connection");

const app = express();
const PORT = process.env.PORT;


app.use(express.json());
const allowedOrigins = ["https://short-url-beta-coral.vercel.app"];
app.use(cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow necessary methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow headers
    credentials: true, // Allow cookies (if needed)
  }));
  app.options("*", cors()); 

connectMongoDb("mongodb+srv://user1:qwertyuiop@cluster.mheoc.mongodb.net/?retryWrites=true&w=majority&appName=cluster")
// mongodb://127.0.0.1:27017/shorturl
.then(()=>console.log("MongoDB connected Successful"))
.catch((err)=>console.log("Error in connection mongoDB",err))

app.use("/user", userRoute)
app.use("/", urlRoute)
app.listen(PORT,()=>console.log("server started at PORT :",PORT))