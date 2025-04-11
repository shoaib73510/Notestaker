import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import auth from "./Routes/auth.js"
import todo from "./Routes/todoroutes.js";



const port = process.env.PORT || 8000

const app = express();
app.use(cors());
app.use(bodyParser.json());


mongoose.connect(process.env.mongoose_url, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.use("/api/Notestaker/auth",auth)
app.use("/todo",todo)

app.listen(port , () =>{
    console.log(`http://localhost:${port}`);
});