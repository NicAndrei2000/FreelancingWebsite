const express=require('express');
const cors=require('cors');
const router=require('./routes');

const app=express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

let port=8080;

app.use("/api",router);
app.use("/home",(req,res)=>{
    res.status(201).send({message:"Acasica"});
})

app.listen(port,()=>{
    console.log("Serverul merge pe portul "+port);
})
