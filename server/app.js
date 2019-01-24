// tut-GraphQL/server/app.js
const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();

// Environment Variables
const env = require('./.env.js')
const { dbURL } = env

// GraphQL Schema
const schema = require('./schema/schema')

// Mongoose Connection
mongoose.connect(dbURL, { useNewUrlParser: true });
const db = mongoose.connection

db.once('open', () => {
  console.log('connected to Database on mLab');
})

// CORS for Cross origin (server -> client)
app.use(cors())

app.get('/', (req, res) => {
  res.send('Go to /graphql');
})

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.listen(4000, () => {
  console.log("Now listening for requests on port 4000")
})