const express = require('express');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.send({ message: 'Hello WWW!' });
});

app.listen(3333, () => {
    console.log('Application listening on port 3333!');
});
const path = require('path');

const fs = require('fs')
app.post('/users', function (req, res) {
  const user = req.body
  fs.appendToFile('users.txt', JSON.stringify({name: user.name, age: user.age }), (err) => {  
    res.send('successfully registered')
  })
})