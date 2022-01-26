const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require("graphql");
const { hello } = require("./queries");
const QueryType = new GraphQLObjectType({
  name: "QueryType",
  description: "The root query type",
  fields:{
    hello:hello
  }
});
 
module.exports = new GraphQLSchema({
    query:QueryType
});
