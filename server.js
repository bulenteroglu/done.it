const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const Pusher = require("pusher");

// set up express
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
// set up mongoose

mongoose.connect(
  process.env.MONGODB_CONNECTION_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) throw err;
  }
);

const pusher = new Pusher({
  appId: "1067329",
  key: "e1f1d6a2b99b78cc4995",
  secret: "cc7fb6dc38a4dfac3ae8",
  cluster: "eu",
  encrypted: true,
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("db connected");

  const todoCollection = db.collection("todos");
  const changeStream = todoCollection.watch();

  changeStream.on("change", (change) => {
    console.log(change);

    if (change.operationType === "insert") {
      const todoDetail = change.fullDocument;
      console.log(todoDetail);
      pusher.trigger("todos", "inserted", {
        _id: todoDetail._id,
        title: todoDetail.title,
        date: todoDetail.date,
        startTime: todoDetail.startTime,
        endTime: todoDetail.endTime,
        done: todoDetail.done,
        description: todoDetail.description,
        catagory: todoDetail.catagory,
        userId: todoDetail.userId,
      });
    }
  });
});

// set up routes
app.use("/users", require("./routes/userRouter"));
app.use("/todos", require("./routes/todoRouter"));

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));
