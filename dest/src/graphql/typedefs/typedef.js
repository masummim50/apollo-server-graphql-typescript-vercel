"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
exports.typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }


  type User {
    _id:String!
    name: String!
    email: String!
    posts: [String]
    avatar: String
    }


  type Post {
    _id: String!
    title: String!
    content: String!
    author: String
    tags: [String]
    like: [String]
    dislike: [String]
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    books: [Book]
    book: Book
    users: [User]
  }

  type Mutation {
    signUp(name:String, email:String, password:String): signUpResponse
    login(email:String, password:String): loginResponse
    addPost(title:String, content:String) : Post
  } 



  # response types
  type signUpResponse {
    message:String
    success:Boolean
  }
  type loginResponse {
    token:String
    success:Boolean
    message:String
  }


  # union types

`;
