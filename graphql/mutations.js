const { GraphQLString } = require("graphql");
const { User } = require("../models");
const { createJWTToken } = require("../util/auth");

const register = {
  type: GraphQLString,
  description: "Register a new User and return a token",
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
    const user = new User({
      username,
      email,
      password,
      displayName,
    });
    await user.save(); //insertando datos en BD
    const token = createJWTToken({ username, email, displayName });
    //console.log(token)
    return token;
  },
};
const login = {
  type: GraphQLString,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(_, args) {
    const user = await User.findOne({email:args.email})  
    console.log(user);
    return "login";
  },
};
module.exports = {
  register,
  login,
};
