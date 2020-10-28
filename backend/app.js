const express = require('express');
const cors = require('cors');
const NodeCouchDb = require('node-couchdb');

const couch = new NodeCouchDb({
  auth: {
    user: 'master',
    pass: 'master',
  },
});

module.exports = { couch };

if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv');
  dotenv.config();
}

/*----------------------------------------------------------------------------------------------------*/

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const locationsRoute = require('./routes/locations_route');

app.use('/api/locations', locationsRoute);

app.listen(process.env.PORT, () => {
  console.log(`================={ SERVER CREATED AT PORT : ${process.env.PORT} }=================`);
});
