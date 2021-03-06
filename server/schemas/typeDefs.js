// import the gql taged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
type Query {
    me: User        
}
input BookInput {
    authors: [String]
    description: String
    title: String
    bookId: ID!
    image: String
    link: String
}
type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookData: BookInput!): User
    removeBook(bookId: ID!): User  
}
type User {
    _id: ID!
    username: String!        
    email: String!
    bookCount: Int
    savedBooks: [Book]
}
type Book {
    bookId: ID!
    authors: [String]
    description: String!
    image: String
    link: String
    title: String
}
type Auth {
    token: ID!
    user: User
}
`
// export the typeDefs
module.exports = typeDefs;