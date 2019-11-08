const express=require('express');
const app=express();
const body=require('body-parser');
const path=require('path');
 
const sketch =require('./routes/sketch');

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
//app.set('views','views');

app.use(express.static(path.join(__dirname,'public')))
app.use(body.urlencoded({extended:false}));

app.use(sketch);
app.use((req,res,next)=>{
    res.render('error',{tit:'error-no-url'});
})

app.listen(4000);
console.log('try from 4000')

