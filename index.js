//initiate express server
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//log session
const session = require("express-session");
const bodyParser = require("body-parser");

app.use(
          session({
            secret: "secret",
            resave: true,
            saveUninitialized: true,
          })
        );
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//connect to database
const db = require('./db');
db.connect(error => {
          if(error) throw error
          console.log ('connected to database')
})

//endpoint
app.get('/', (req, res) => {
          res.send({
                    message: 'GET success',
                    data : {
                              description : 'this is a GET endpoint'
                    }
          })
})

app.use ("/penduduk", require('./routes/penduduk.route'));
const port = 8080;
app.listen(port, () => console.log (`Server on port ${port}`))

