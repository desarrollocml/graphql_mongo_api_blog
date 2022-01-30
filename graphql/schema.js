const { GraphQLSchema, GraphQLObjectType } = require("graphql");
const {
  register,
  login,
  createPost,
  updatePost,
  deletePost,
  addComment,
  updatedComment,
} = require("./mutations");
const { users, user, posts, post, comments, comment} = require("./queries");

const QueryType = new GraphQLObjectType({
  name: "QueryType",
  description: "The root query type",
  fields: {
    users,
    user,
    posts,
    post,
    comments,
    comment,
  },
});

const MutationType = new GraphQLObjectType({
  name: "MutationType",
  description: "The root mutation type",
  fields: {
    register,
    login,
    createPost,
    updatePost,
    deletePost,
    addComment,
    updatedComment
  },
});

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
