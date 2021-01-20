const mongoose = require("mongoose");

//When using mongoose, we need to create a Schema and a Model
//for every collection we want to work with

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  pages: Number,
  condition: String,
  genres: [String],
  availability: String
});

const BookModel = mongoose.model("Book", bookSchema);

//return BookModel.create({})
//return BookModel.find({});
//return BookModel.findById("5fdd485b2b8adf5a4f645de0");
//return BookModel.findOne({})
//return BookModel.findOneAndDelete({title: "Life 3.0"});
//return BookModelModel.findOneAndUpdate("5fdd485b2b8adf5a4f645de0", {
//      condition: 'used',
//     pages: 500
//    },
//    { new: true}
//    );

mongoose
  .connect("mongodb://localhost:27017/library", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connection established");
    //Look up documents from the database when connection has been established
    return BookModel.find({
      pages: { $gte: 400 }
    });
  })
  .then((books) => {
    console.log("Queried the books collection from all book documents.");
    console.log(books);

    return BookModel.create({
      title: "The Secret Live of Solarsystems",
      author: "Paul Murdin",
      pages: 279,
      genres: ["science"],
      availability: true
    });
  })
  .then((book) => {
    console.log("Book was created");
    console.log(book);

    return BookModel.create([
      {
        title: "Life 3.0",
        author: "Mag Tegmark",
        pages: 364
      },
      {
        title: "This Idea is briliant",
        author: "John Brockman",
        pages: 508
      }
    ]);
  })
  .then((books) => {
    console.log("Added multiple books");
    console.log(books);

    return BookModel.findById("5fdd485b2b8adf5a4f645de0");
  })

  .then((book) => {
    console.log("Found book by it's ID");
    console.log(book);

    BookModelModel.findByIDAndUpdate(
      "5fdd485b2b8adf5a4f645de0",
      {
        condition: "used",
        pages: 500
      },
      { new: true }
    );
  })
  .then((book) => {
    console.log("Updated book condition to used");
    console.log(book);

    return mongoose.disconnect();
  })

  .then(() => {
    console.log("Connection has been destroyed");
  })
  .catch((error) => {
    console.log("Had troubles with:");
    console.log(error);
  });

Game.loop();
game.loop();
