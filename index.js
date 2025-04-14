const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items = []; 
let workItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"))

app.get("/", function (req, res) {
    let today = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    let day = today.toLocaleDateString("en-US", options);

    res.render("list", { listTitle: day, newListItems: items });

    
});


app.post("/", function (req, res) {

    let itemText = req.body.newItem;
    let now = new Date();
    let time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    let newItem = {
        text: itemText,
        time: time
    };

    if (req.body.list === "Work") {
        workItems.unshift(newItem);
        res.redirect("/work");
    } else {
        items.unshift(newItem);
        res.redirect("/");
    }

});

app.get("/work", function(req,res){
    res.render("list", {listTitle:"Work List", newListItems: workItems})
});




app.listen(3000, function () {
    console.log("Server started on port 3000");
});
