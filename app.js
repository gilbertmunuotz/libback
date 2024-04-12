//Import NPM packages
var cors = require('cors');
var express = require('express');
var mongoose = require('mongoose')
var port = process.env.PORT || 4000;
var usersRoute = require('./routes/usersRoute');
const bodyParser = require('body-parser');
require('dotenv').configDotenv();

//Implement  connection to Database here
async function connectToMongo() {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {});
    console.log("MongoDB Connected Succesfully");
  } catch (error) {
    console.error("Error Connecting to MongoDB", error);
  }
}
//Call Your function Here
connectToMongo()


// Initiate Express
var app = express();

// Add your Express middleware,and other logic here
app.use(bodyParser.json());

app.use(cors());
//Allow Custom Origins
// app.use(cors({
//   origin: 'http://localhost/3000',
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type"]
// })
// );

//Define Routes Here
app.use(usersRoute)

//Listen to Server Resonse
app.listen(port, () => {
  console.log(`Server Listening on ${port}`);
})
module.exports = app;
