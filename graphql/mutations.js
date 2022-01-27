const { GraphQLString } = require("graphql");

const register = {
  type: GraphQLString,
  description: "Register a new User",
  args: {
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    displayName: { type: GraphQLString },
  },
  resolve(_, args) {
    //" _ " iria "parent" consulta dentro de otra consulta
    console.log(args);
    return "new user created";
  },
};

module.exports = {
  register,
};
