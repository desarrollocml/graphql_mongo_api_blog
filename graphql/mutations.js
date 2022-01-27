const { GraphQLString } = require("graphql");

const register = {
  type: GraphQLString,
  description: "Register a new User",
  resolve() {
    return "new user created";
  },
};

module.exports = {
  register,
};
