const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { connectDB } = require("./db");
const schema = require("./graphql/schema");
const { authenticate } = require("./middlewares/auth");
connectDB();
const app = express();

app.use(authenticate)

app.get("/", (req, res) => {
  res.send("Welcome to my graphql api");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);
app.listen(3000);
console.log("server on port 3000");
