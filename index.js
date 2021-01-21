const express = require("express");
const path = require("path");
const AdvertModel = require("./models/advert");
const mongoose = require("mongoose");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// Make express parse request bodies
//app.use(express.urlencoded());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  //Querry the database for every advert
  AdvertModel.find().then((adverts) => {
    res.render("home", { adverts: adverts });
  });

  //Render home view and pass it adverts
});

app.get("/create", (req, res) => {
  res.render("create");
});

app.post("/create", (req, res) => {
  // get info that user submitted in the form
  const data = req.body;
  console.log(data);
  // save to database...
  AdvertModel.create({
    title: data.title,
    description: data.description,
    location: data.location
  }).then(() => {
    res.redirect("/");
    // redirect the user to home
  });
});

mongoose
  .connect("mongodb://localhost:27017/get-it-posted", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(3000);
  });
