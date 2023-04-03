const express = require("express"); //install npm i express
const mongoose = require("mongoose"); //install npm i mongoose
const cors = require("cors"); //to cross access the database
const app = express(); //declare app after install express
const PORT = 3003; //declare a PORT for current app
const MONGOBD_URI = "mongodb://localhost:27017/holidays"; //declare a port at MongoDB
const whiteList = ["http://localhost:3000", "http://localhost:3000"];
const corsOption = {
  origin: whiteList,
  //methods: ["GET", "POST","PUT", "DELETE"]
};

const holidaysController = require("./controllers/holidays");
mongoose.connect(MONGOBD_URI, {
  useNewUrlParser: true,
});

//Executed once we establish connection with our MongoDB
mongoose.connection.once("open", () => {
  console.log("Connected to Mongoose DB");
});

//Executed when we encouter any issue when connecting with MongoDB
mongoose.connection.on("error", () => {
  console.log("Error connecting to your database");
});

//Executed when we disconnect from Mongo DB
mongoose.connection.on("disconnected", () => {
  console.log("Mongo DB is Disconnected");
});

app.use(express.json());
app.use(cors(corsOption)); //CORS
app.use("/holidays", holidaysController);

//Make the app listen to the specific PORT
app.listen(PORT, () => {
  console.log("Holidays App is listening on PORT " + PORT);
});

/*
To Test Create Function
curl -X POST -H "Content-Type:application/json" -d '{"name":"Deepavali"}' http://localhost:3003/holidays

-H: Header
"Content-Type: application/json"
Specified the content is JSON
-d: data

To Test Read Function 
curl -X  http://localhost:3003/holidays

To Test Delete Function
curl -X DELETE  http://localhost:3003/holidays/634f84c4c762917c47f9ea0d

To Test Update Function
curl -X PUT -H "Content-Type:application/json" -d '{"name":"Ramdom999"}' http://localhost:3003/holidays/634fa6ee8a44b47bd71061bb
*/
