// const { verify } = require('crypto')
const express = require('express')
const fs = require('fs')
const jwt = require('jsonwebtoken')

const app = express()
const port = 3000
app.use(express.json())


function find(arr,id){
    student = arr.find((student)=> student.ID===id)
    return student
}

function readJSON(file){
    data = fs.readFileSync(file,'utf-8');
    data = JSON.parse(data)
    return data
}

app.get("/login",(req,res)=>{
    let user={
        name : "krishna",
        pass : "sdfghj"
    }
    jwt.sign(user,"abcd",{expiresIn : "2m" },(err,token)=>{
        if(err){
            res.send(err)
        }
        res.json({token});
    })
    
})

function verifyToken(req,res,next){
    req.token = req.headers.authorization.split(" ")[1]
    next()
}

app.get("/profile",verifyToken,(req,res)=>{
    jwt.verify(req.token,"abcd",(err,data)=>{
        if(err){
            console.log(err)
            res.send("Forbidden Request")
        }else{
            console.log(data)
            res.send("Valid request")
        }
    })

})

app.get("/display",(req,res)=>{
    
    data = readJSON('./data.json')
    res.json(data)
})

app.post("/insert",(req,res)=>{

    newStudent={
        Name : req.body.name,
        ID : req.body.id,
        Branch : req.body.branch
    }
    obj = readJSON('./data.json')
    obj.push(req.body);
    fs.writeFileSync("./data.json",JSON.stringify(obj))
    res.send("Inserted successfully");
})

app.put("/update/:id",(req,res)=>{
    id = parseInt(req.params.id)
    arr = readJSON('./data.json')
    student =find(arr,id)
    if(!student){
        res.send("Student does not exist");
    }
    student.Name=req.body.name
    student.Branch=req.body.branch
    fs.writeFileSync("./data.json",JSON.stringify(arr))
    res.json(student)

})

app.delete("/delete/:id",(req,res)=>{
    id = parseInt(req.params.id)
    arr = readJSON('./data.json')
    if(!find(arr,id)){
        res.send("Student not found")
    }
    arr = arr.filter((st)=>st.ID!=id)
    fs.writeFileSync("./data.json",JSON.stringify(arr))
    res.send("Successfully deleted")
})

app.listen(port,()=>console.log(`Server is listening at ${port}..`));``
