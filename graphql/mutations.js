const { GraphQLString, UniqueDirectiveNamesRule } = require("graphql");
const { User, Post } = require("../models");
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
    const token = createJWTToken({
      _id: user._id,
      email: user.email,
      displayName: user.displayName,
    });
    //console.log(token)
    return token;
  },
};
const login = {
  type: GraphQLString,
  description: "Login a user and returns token",
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(_, { email, password }) {
    const user = await User.findOne({ email }).select("+password");
    if (!user || password !== user.password)
      throw new Error("Invalid credentials");

    //console.log(user);
    const token = createJWTToken({
      _id: user._id,
      usename: user.username,
      email: user.email,
    });
    return token;
  },
};

const createPost = {
  type: GraphQLString,
  description: "Create a new Post",
  args: {
    title: { type: GraphQLString },
    body: { type: GraphQLString },
  },
  resolve(_, args) {
    console.log(args);

    const newPost = new Post({
      title: args.title,
      body: args.body,
      authorId: "61f356e584b448660fbd4e08",
    });

    console.log(newPost);
    return "New Post Created";
  },
};

module.exports = {
  register,
  login,
  createPost,
};
