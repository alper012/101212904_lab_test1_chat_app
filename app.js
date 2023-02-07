//Express
const express = require('express');
const { Int32 } = require('mongodb');
const app = express()
//Port Number
const port = 3001
//Socket
const io = require("socket.io")(3005);
//Mongo
const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://alper012:Ozkanozkara16-@cluster0.ixrv5tn.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
//Body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

client.connect(err => {
  const collection = client.db("test").collection("devices");
  client.close();
});

const userSchema = new Schema({
  id: {
  type: int,
  required: true
  },
  username: {
  type: String,
  required: true
  },
  firstname: {
  type: String,
  required: true
  },
  lastname: {
  type: String,
  required: true
  },
  password: {
    type: Int32,
    required: true
  },
  creaton: {
    type: Date,
    default: Date.now
    }
  });

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/signup.html');
})

app.listen(port, () => {
  console.log(`chatApp at http://localhost:${port}`)
})

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  collection.findOne({ username, password }, (err, result) => {
    if (err) throw err;
    if (result) {
      // found a match
      res.send('Success');
    } else {
      // no match
      res.send('Failed');
    }
  });
});

