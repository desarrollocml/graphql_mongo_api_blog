const { GraphQLString } = require("graphql");
const { User } = require("../models");

const register = {
  type: GraphQLString,
  description: "Register a new User",
  args: {
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    displayName: { type: GraphQLString },
  },
  async resolve(_, { username, email, password, displayName }) {
    //" _ " iria "parent" consulta dentro de otra consulta
    //const { username, email, password, displayName } = args;
    //console.log(args);
    const newUser = await User.create({//insertando datos en BD
      username,
      email,
      password,
      displayName,
    });
    //console.log(newUser);
    return "new user created";
  },
};

module.exports = {
  register,
};
