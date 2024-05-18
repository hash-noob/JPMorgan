const express = require('express')
const routes = express.Router()
const student_db = require("../Models/student_model")

routes.post("/insert",async (req,res)=>{
    
    req.body.ID = parseInt(req.body.ID)
    let result = await student_db.create(req.body); 
    res.json(result);

})

routes.get("/display",async (req,res)=>{

    let result = await student_db.find({}); 
    res.json(result);

})
routes.get("/find",async (req,res)=>{
    
    id = parseInt(req.body.ID)
    let result = await student_db.findOne({ID : id}); 
    res.json(result);

})
routes.delete("/delete",async (req,res)=>{
    
    id = parseInt(req.body.ID)
    let result = await student_db.deleteOne({ID : id}); 
    res.json(result);
})

routes.put("/update",async (req,res)=>{

    id = parseInt(req.body.ID)
    let result = await student_db.updateOne({ID : id},{Name : req.body.Name}); 
    res.json(result);
})

module.exports = routes