const express = require('express'); // express not shipped with node.js, can only use this after installing express.
const bodyParser = require('body-parser');
const app = express(); // express app is the big chain of middlewares. funnal through which we send request.

// function in node js ()=>{}
// app.use((req, res, next)=>{
//     console.log("first middle ware")
// next(); // this goes to the next app.use
// // if you are not sending response (res) and also not using next() then it will not quit but will keep on spinning which is not good. 
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api/posts',(req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS");
next();
});
app.post('/api/posts',(req, res, next)=>{
    const post =req.body;
    console.log(post);
    res.status(201).json({
        message:"Post added successfully"
    })
});
app.get('/api/posts',(req, res, next)=>{
//res.send("hello from express!");
const posts =[
   {
       id:'sdgafggad', 
       title:'First server-side post',
       content:"This is coming from the server"
},
{
    id:'saffgaerger', 
    title:'Second server-side post',
    content:"This is coming from the server"
}
];
res.status(200).json({
    message:'Post fetched succesfully!',
    posts:posts
});
});


module.exports =app;