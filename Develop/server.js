//Dependencies
var express = require("express");
var path = require("path");
var fs = require("fs");

//set up the express and port
var app = express();
var PORT = 3000;
app.use(express.static('public'))



//sets up the express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
//console.log("OUTSIDE", __dirname)
app.use(express.json());
//basic routes--

app.get("/notes", function (req, res) {
    //console.log(__dirname)
    res.sendFile(path.join(__dirname, "./public/notes.html"))
});
app.get("/api/notes", function (req, res) {
    //res.json(newNote);
    res.sendFile(path.join(__dirname, "./db/db.json"))
});
//display a single character,or return false
app.get("/api/notes/:id", function (req, res) {
    //var choosen = req.params;
    //var myid = choosen.id
    let noteData = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    res.json(noteData[Number(req.params.id)]);
    console.log("index",Number(req.params.id));//it gives index number of object array;

    //console.log("choosen....", myid);
    // noteData.splice(choosen,1);
    // console.log("notedata",noteData);
});
//post route
app.post("/api/notes", function (req, res) {
    //read the file in db.json file and assign to the variable
    // var readFile = fs.readFile("./db/db.json", "utf8", function (error, data) {
    //     if (error) {
    //         return console.log(error);
    //     }
    // });
    //parsing the readfile and making it object and assign to variable
    var noteData=JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    var newNote = req.body;
    console.log("new data enter", newNote);


    noteData.push(newNote);
    console.log("inside the array", noteData);
//after pushing new data into object and writing that object into our file db.json
    // fs.writeFile("./db/db.json", JSON.stringify(noteData), function (err) {
    //     if (err) {
    //         throw err;
    //     }
    // });
    fs.writeFileSync("./db/db.json", JSON.stringify(noteData));

    res.sendFile(path.join(__dirname, "./db/db.json"))

});
app.delete("app/notes/:id",function(req,res){
    var noteData=JSON.parse(fs.readFileSync("./db/db.json","utf8"));
    var choosen=req.params.id;
    console.log(choosen);
   /// noteData.splice(Number(req.params.id),1);
    var newId=0;
    noteData=noteData.filter(currentNote=>{
        return currentNote.id!=choosen;
    });
    for(currentNote of noteData){
        currentNote.id=newId.toString();
        newId++;
    }


    fs.writeFileSync("./db/db.json", JSON.stringify(noteData));
    res.sendFile(path.join(__dirname, "./db/db.json"));
})

app.get("*", function (req, res) {
    console.log("INSIDE", __dirname)
    res.sendFile(path.join(__dirname, "./public/index.html"))
});



//start listening on port
app.listen(PORT, function () {
    console.log("app listening on PORT" + PORT);
})

