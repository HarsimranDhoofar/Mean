const express = require('express'); // express not shipped with node.js, can only use this after installing express.
const bodyParser = require('body-parser');
const app = express(); // express app is the big chain of middlewares. funnal through which we send request.

const postsRoutes = require("./routes/posts")
const mongoose = require('mongoose');
// function in node js ()=>{}
// app.use((req, res, next)=>{
//     console.log("first middle ware")
// next(); // this goes to the next app.use
// // if you are not sending response (res) and also not using next() then it will not quit but will keep on spinning which is not good. 
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

mongoose.connect("mongodb+srv://harsimran:7XFrPuKYIfqqphjR@cluster0-e4hew.mongodb.net/node-angular?retryWrites=true&w=majority")
    .then(() => {
        console.log('connected to database')
    }).catch(() => {
        console.log('connection Failed')
    });

    app.use('/api/posts', (req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*"); // need to change this from localhost during deployment 
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS, PUT");
        next();
    });
    app.use("/api/posts",postsRoutes);
module.exports = app;