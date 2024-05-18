require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const student = require('./Models/student_model')
const studentRouter = require('./Database/controls.js')

const db = mongoose.connect("mongodb://localhost:27017/UserDB").then(()=> console.log("DB connected successfully."),()=>{console.log("Failed to connect to DB")})
const app = express();
const port = process.env.PORT;

app.use(express.json())
app.use(express.urlencoded({ extended : true }))
app.use("/student/database",studentRouter)


app.get('/',async (req,res)=>{
    let result = await student.create(req.body);
    res.json(result);
})

app.listen(port,()=>{
    console.log(`The server is listening at ${port}`)
});
