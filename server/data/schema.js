const {buildSchema} = require("graphql");

const schema = buildSchema(`


    enum Soldout {
        SOLDOUT
        ONSALE
    }
    
    type Store {
        store: String
    }

    input StoreInput {
        store: String
    }

    input TodoInput {
        description: String
        username: String
    }
    
    
    input TodoUpdateInput {
        description: String
        id: ID
    }
    
    type Todo {
      todoid: ID!
      todolistid: ID!
      createdAt: String
      updatedAt: String
      title: String!
      description: String
    }
    
    type Mutation {
        createTodo(input: TodoInput): Todo
        updateTodo(input: TodoUpdateInput): Todo
        deleteTodo(id: ID): Todo
    }
    
    type Query {
        getTodos: [Todo]
        getTodo(id: ID): Todo
    }
`)

module.exports = schema;
