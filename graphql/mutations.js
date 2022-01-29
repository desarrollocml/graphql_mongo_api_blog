const { GraphQLString, UniqueDirectiveNamesRule } = require("graphql");
const { User, Post } = require("../models");
const { createJWTToken } = require("../util/auth");
const { PostType } = require("./types");

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
  type: PostType,
  description: "Create a new Post",
  args: {
    title: { type: GraphQLString },
    body: { type: GraphQLString },
  },
  async resolve(_, args, { verifiedUser }) {
    //console.log(verifiedUser);

    const post = new Post({
      authorId: verifiedUser._id,
      title: args.title,
      body: args.body,
    });
    await post.save();
    console.log(post);
    return post;
  },
};

module.exports = {
  register,
  login,
  createPost,
};
