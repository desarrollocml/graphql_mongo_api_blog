const { GraphQLString } = require("graphql");

const hello = {
  type: GraphQLString,
  description: "Returns a String",
  resolve: () => "Hello World",
};
module.exports = { hello };
