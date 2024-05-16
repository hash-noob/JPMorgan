import { MongoClient } from "mongodb";
import { createServer } from "http";

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const db = client.db("Persons").collection('students')

const app = createServer(async (req, res) => {
  res.writeHead(200, {
    'Access-Control-Allow-Origin': '*', // Allow requests from any origin
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', // Allow only specific HTTP methods
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  });
  if( req.method === "POST" && req.url === '/insert'){
    let reqdata =''
    req.on('data',(info)=>{
      reqdata = info.toString()
      })
    req.on("end",()=>{
      let data = JSON.parse(reqdata);
      db.insertOne(data)
    })
    db.close()
    res.statusCode = 200
    res.end()
  }
  else if(req.method === "GET" && req.url === '/display'){
    let result = await db.find({}).toArray()
    const jsonData = JSON.stringify(result);
    res.end(jsonData)
  }else if(req.method === "POST" && req.url === '/delete'){
    let reqdata =''
    req.on('data',(info)=>{
      reqdata = info.toString()
      })
    req.on("end",()=>{
      let data = JSON.parse(reqdata);
      db.deleteOne(data)
    })
  }
  res.end();
})

app.listen(3000);
console.log("Server is running at 3000..");














