

const express = require('express');

const users = require('./users.js');
const basicAuth = require('./basic-auth-middleware.js');
const bearerAuth = require('./bearer-auth-middleware.js');
const acl = require('./acl-middleware.js');
const oauth = require('./oauth-middleware.js');

const app = express();

app.use(express.static('./public'));
app.use(express.json());


app.post('/signup', (req, res) => {
  users.save(req.body)
    .then(user => {
      let token = users.generateToken(user);
      res.status(200).send(token);
    })
    .catch(e => { res.status(403).send('Error Creating User'); });
});

app.post('/signin', basicAuth, (req, res) => {
  res.status(200).send(req.token);
});

app.get('/oauth', oauth, (req, res) => {
  res.status(200).send(req.token);
});

app.get('/allusers', bearerAuth, (req, res) => {
  res.status(200).send('OK!');
});

app.get('/create', bearerAuth, acl('create'), (req, res) => {
  res.status(200).send('OK!');
});

app.get('/update', bearerAuth, acl('update'), (req, res) => {
  res.status(200).send('OK!');
});

app.get('/delete', bearerAuth, acl('delete'), (req, res) => {
  res.status(200).send('OK!');
});




let PORT = 3000;
app.listen(PORT, () => console.log(`server listen on port ${PORT}`));