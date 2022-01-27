const { GraphQLSchema, GraphQLObjectType} = require("graphql");
const { register } = require("./mutations");
const { hello } = require("./queries");

const QueryType = new GraphQLObjectType({
  name: "QueryType",
  description: "The root query type",
  fields:{
    hello:hello
  }
});

const MutationType = new GraphQLObjectType({
  name:"MutationType",
  description: "The root mutation type",
  fields:{
    register,
  }
})

module.exports = new GraphQLSchema({
    query:QueryType,
    mutation:MutationType
});
