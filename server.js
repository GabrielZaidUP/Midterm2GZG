const express =require("express");
const app = express();
const fetch =require("node-fetch");
const https = require("https");
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}))
app.use(express.json());;
app.engine("html", require("ejs").renderFile); 
app.set("view engine", "html");
let id_count = 0;
let Allchars = [];

app.get("/",(req, res) =>{
    fetch('https://thronesapi.com/api/v2/Characters')
    .then((response) => response.json())
    .then((body) => Allchars = body)
    .then((data) => res.render("show_char.ejs", {selected_char: data[0]}));
});
app.post('/next',(req,res)=>{
    id_count ++;
    id_count = id_count >= (Allchars.length) ? 0 : id_count;
    res.render("show_char.ejs", {selected_char: Allchars[id_count]});
});
app.post('/previous',(req,res)=>{
    id_count --;
    id_count = id_count < 0 ? (Allchars.length - 1) : id_count;
    res.render("show_char.ejs", {selected_char: Allchars[id_count]});
});
app.post('/search',(req,res)=>{
    const srchtxt = req.body.srchtxt;
    let charid = 0;
    for (let i = 0; i < Allchars.length; i++) {
        if (Allchars[i].firstName === srchtxt || Allchars[i].lastName === srchtxt || Allchars[i].fullName === srchtxt) {
            charid = i;
            break;
        }
    }
    res.render("show_char.ejs", {selected_char: Allchars[charid]});
});
app.listen(3000,()=>{
    console.log("listening to port 3000....");
})