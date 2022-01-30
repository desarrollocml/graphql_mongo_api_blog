const { GraphQLString, GraphQLID } = require("graphql");
const { User, Post, Comment } = require("../models");
const { createJWTToken } = require("../util/auth");
const { PostType, CommentType } = require("./types");

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

const updatePost = {
  type: PostType,
  description: "Update Post",
  args: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
  },
  async resolve(_, { id, title, body }, { verifiedUser }) {
    if (!verifiedUser) throw new Error("Unauthorized");

    const updatedPost = await Post.findByIdAndUpdate(
      { _id: id, authorId: verifiedUser._id },
      {
        title,
        body,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    console.log(id, title, body);
    return updatedPost;
  },
};

const deletePost = {
  type: GraphQLString,
  description: "Delete a post",
  args: {
    postId: { type: GraphQLID },
  },
  async resolve(_, { postId }, { verifiedUser }) {
    if (!verifiedUser) throw new Error("Unauthorized");
    const postDeleted = await Post.findOneAndDelete({
      _id: postId,
      authorId: verifiedUser._id,
    });
    if (!postDeleted) throw new Error("Post not found");
    return "Post deleted";
  },
};

const addComment = {
  type: CommentType,
  description: "Add a comment to a post",
  args: {
    comment: { type: GraphQLString },
    postId: { type: GraphQLID },
  },
  async resolve(_, { comment, postId }, { verifiedUser }) {
    const newComment = new Comment({
      comment,
      postId,
      userId: verifiedUser._id,
    });
    return newComment.save();
  },
};

const updatedComment = {
  type: CommentType,
  description: "Update a comment",
  args: {
    id: { type: GraphQLID },
    comment: { type: GraphQLString },
  },
  async resolve(_, { id, comment }, { verifiedUser }) {
    if (!verifiedUser) throw new Error("Unautorized");

    const commentUpdated = await Comment.findOneAndUpdate(
      {
        _id: id,
        userId: verifiedUser._id,
      },
      {
        comment,
      }
    );
    if (!commentUpdated) throw new Error("Comment not found");
    return commentUpdated;
  },
};

const deleteComment = {
  type: GraphQLString,
  description: "Delete a comment",
  args: {
    id: { type: GraphQLID },
  },
  async resolve(_, { id }, { verifiedUser }) {
    if (!verifiedUser) throw new Error("Unauthorized");

    const commentDelete = await Comment.findOneAndDelete({
      _id: id,
      userId: verifiedUser._id,
    });
    if (!commentDelete) throw new Error("Comment not found");
    return "Comment Delete";
  },
};

module.exports = {
  register,
  login,
  createPost,
  updatePost,
  deletePost,
  addComment,
  updatedComment,
  deleteComment,
};
