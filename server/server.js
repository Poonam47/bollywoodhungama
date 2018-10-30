var express = require('express'); 
var app = express(); 
var path = require('path');
var connected = app.listen(4000);
if(connected){
    console.log("server connected to the port");
}

app.get('/',(req,res)=>{
    res.send("hello world");
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/help',(req,res)=>{
res.redirect('help.html');
});