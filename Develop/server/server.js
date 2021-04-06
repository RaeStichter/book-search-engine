const express = require('express');

// import ApolloServer
// const { ApolloServer } = require('apollo-server-express');
const path = require('path');

// import typeDefs and resolvers and middleware
//const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');
// this will be replaced with the schemas
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

// create new ApolloServer and pass in the schema data
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: authMiddleware
// });

// integrate the ApolloServer with the express application as middleware
//server.applyMiddleware({app});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// this will be replaced with app.get*
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
