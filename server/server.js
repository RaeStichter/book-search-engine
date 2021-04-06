const express = require('express');

// import ApolloServer
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

// import typeDefs and resolvers and middleware
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');

// db connection information
const db = require('./config/connection');


const app = express();
const PORT = process.env.PORT || 3001;

// create new ApolloServer and pass in the schema data
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

// integrate the ApolloServer with the express application as middleware
server.applyMiddleware({app});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    // log where we can go to test out GQL API
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
