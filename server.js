var express = require("express");
var bodyParser = require("body-parser");

server = express();
var fs = require("fs");

server.use(express.static("Bs5_Vue"));//web root
//server.use(express.static("md110"));//web root
server.use(bodyParser.urlencoded());
server.use(bodyParser.json());

const formidable  = require('formidable')

var DB = require("nedb-promises");
var ContactDB = DB.create("contact.db");
var PortfolioDB = DB.create("portfolio.db");
// PortfolioDB.insert([
//     { href: "#portfolioModal1", imgSrc: "img/portfolio/roundicons.png", title: "Round Icons", text: "Graphic Design" },
//     { href: "#portfolioModal2", imgSrc: "img/portfolio/startup-framework.png", title: "Startup Framework", text: "Website Design" },
//     { href: "#portfolioModal3", imgSrc: "img/portfolio/treehouse.png", title: "Treehouse", text: "Website Design" },
//     { href: "#portfolioModal1", imgSrc: "img/portfolio/roundicons.png", title: "Round Icons", text: "Graphic Design" },
//     { href: "#portfolioModal2", imgSrc: "img/portfolio/startup-framework.png", title: "Startup Framework", text: "Website Design" },
//     { href: "#portfolioModal3", imgSrc: "img/portfolio/treehouse.png", title: "Treehouse", text: "Website Design" }
// ])
 
 
//var sharp=
server.set("view engine", "ejs");
server.set("views", __dirname+"/views");


server.post("/contact",   function(req, res){
    //res.send("");
    //var form = formidable({maxFileSize: 200*1024});
     const form = new formidable.IncomingForm();
    // form.maxFileSize = 200*1024;
     form.parse(req, function (err,fields,files){
        console.log(fields);
        console.log(files);
        fs.renameSync(files.imgSrc.filepath, "Bs5_Vue/upload/"+files.imgSrc.originalFilename);
        var newData = fields;
        newData.imgSrc = "upload/"+files.imgSrc.originalFilename;
        PortfolioDB.insert(newData);
        res.redirect("/");
     });
    
});

server.get("/contact",   function(req, res){
    //var form = formidable({maxFileSize: 200*1024});
    const form = new formidable.IncomingForm();
    // form.maxFileSize = 200*1024;
     form.parse(req, function (err,fields,files){
        console.log(fields);
        console.log(files);
        
        res.send("OK");
     });
 
})
   

server.get("/service", function(req, res){

    Services = [
        { icon: "fa-shopping-cart", title: "E-Commerce", desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur porro laborum fuga repellat necessitatibus corporis nulla, in ex velit recusandae obcaecati maiores, doloremque quisquam similique, tempora aspernatur eligendi delectus! Rem." },
        { icon: "fa-laptop", title: "Responsive Design", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime qua architecto quo inventore harum ex magni, dicta impedit." },
        { icon: "fa-lock", title: "Web Security", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit." }
    ]
    res.send(Services);
})

server.get("/portfolio", function(req, res){
    //res.send("U Got it!");
 
    PortfolioDB.find({}).then(results => {
        if(results !=null){
            res.send(results);
        }else{
            res.send("Error!")
        }
    }) 
    //   res.send(portfolio);
})


 



server.listen(5500, function(){
    console.log("Server is running at port 8000!")
})