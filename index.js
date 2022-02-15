//initiate server
const express = require('express');
//implement
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

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

