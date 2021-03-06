const express = require('express');
const app = express();
app.use(require('body-parser').json());
const path = require('path');

const db = require('./db');
const { Customer } = db.models;
db.sync()
  .then(()=> db.seed());

app.get('/api/customers', (req, res, next)=> {
  Customer.findAll({
  })
  .then( customers => res.send(customers))
  .catch(next);
});

app.post('/api/customers', (req, res, next)=> {
  Customer.create(req.body)
    .then( customer => res.send(customer))
    .catch(next);
});

app.delete('/api/customers/:id', (req, res, next)=> {
  Customer.findById(req.params.id)
    .then( customer => customer.destroy())
    .then( ()=> res.sendStatus(204))
    .catch(next);
});

app.get('/', (req, res, next)=> {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/app.js', (req, res, next)=> {
  res.sendFile(path.join(__dirname, 'app.js'));
});

app.use((err, req, res, next)=> {
  res.status(500).send({ error: err});
});

const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`listening on port ${port}`));
