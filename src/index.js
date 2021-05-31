import { ApolloServer, gql } from 'apollo-server'
import knex from 'knex'

let mySQL = knex({
  client: 'mysql',
  connection: {
    host: '116.62.209.249',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'springboot_review_online'
  }
})

let typeDefs = gql`
  type Query {
    users(isActive: Int!): [User]
  }

  type User {
    id: Int,
    password: String,
    isActive:Int
  }
`

let users = (_, { isActive }) => mySQL('inneruser')
  .select()
  .where({
    'isActive': isActive
  })

let resolvers = {
  Query: {
    users
  }
}

let apolloServer = new ApolloServer({ typeDefs, resolvers })

apolloServer.listen()
  .then(({ url }) => `GraphQL Server ready at ${url}`)
  .then(console.log)