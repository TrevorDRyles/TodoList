const {buildSchema} = require("graphql");

const schema = buildSchema(`
    type Product {
        id: ID
        name: String
        description: String
        price: Float
        soldout: Soldout
        stores: [Store]!
        inventory: Int
    }

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

    input ProductInput {
        id: ID
        name: String
        description: String
        price: Float
        soldout: Soldout
        stores: [StoreInput]!
        inventory: Int
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
        createProduct(input: ProductInput): Product
        createTodo(input: TodoInput): Todo
        updateTodo(input: TodoUpdateInput): Todo
        deleteTodo(id: ID): Todo
    }
    
    type Query {
        getProduct(id: ID): Product
        getTodos: [Todo]
        getTodo(id: ID): Todo
    }
`)

module.exports = schema;
