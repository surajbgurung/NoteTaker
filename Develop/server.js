//Dependencies
var express = require("express");
var path = require("path");
var fs = require("fs");

//set up the express and port
var app = express();
var PORT = 3000;
app.use(express.static('public'))

//creating variable to hold the data
//for first data
var noteData = [];

// fs.readFile("./db/db.json", "utf8", function (error, data) {
//     var newjsonFile =JSON.parse(data); 


//     console.log("data",data);
//     if (error) {
//         return console.log(error);
//     }
    
//         noteData.push(newjsonFile);
//         console.log(newjsonFile);


// });




//for more than one datat
// var secondNoteData=[];

//sets up the express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//basic routes
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"))
});
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
});
app.get("/api/notes", function (req, res) {
    //res.json(newNote);
    res.sendFile(path.join(__dirname, "./db/db.json"))
});
//display a single character,or return false
app.get("/api/notes/:id", function (req, res) {
    var choosen = req.params;
    var myid=choosen.id
    
    console.log("choosen....",myid);
    // noteData.splice(choosen,1);
    // console.log("notedata",noteData);
     for(var i=0; i<noteData.length;i++){
        if(choosen===noteData[i].title){
           return res.json(noteData[i]);
        }
     }
});

//post route
app.post("/api/notes", function (req, res) {
    var newNote = req.body;
    console.log("new data enter",newNote);

    
    noteData.push(newNote);
    console.log("inside the array",noteData);
    
    fs.writeFile("./db/db.json", JSON.stringify(noteData), function (err) {
        if (err) {
            throw err;
        }
    });
    
    res.sendFile(path.join(__dirname, "./db/db.json"))

});





//start listening on port
app.listen(PORT, function () {
    console.log("app listening on PORT" + PORT);
})

