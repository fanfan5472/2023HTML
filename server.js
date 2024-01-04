var express = require("express");
var bodyParser = require("body-parser");

server = express();
var fs = require("fs");

server.use(express.static(__dirname+"/Bs5_Vue"));//web root
server.use(bodyParser.urlencoded({extended:true}));
server.use(bodyParser.json());

// const fileUpload = require("express-fileupload");
// server.use(fileUpload())

const formidable  = require('formidable')
 
var DB = require("nedb-promises");
var ContactDB = DB.create("contact.db");
var PortfolioDB = DB.create("portfolio.db");
 
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
        fs.renameSync(files.myfile.filepath, "Bs5_Vue/upload/"+files.myfile.originalFilename);
        var newData = fields;
        newData.imgSrc = "upload/"+files.myfile.originalFilename;
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
   

    //email to manager
    //res.send();
  

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