const express = require("express");
const mongoose = require("mongoose");
const recipeRouter = require("./routes/recipe/recipeRoutes");
const app = express();
require("dotenv").config();
const env = process.env;

app.use(recipeRouter);
mongoose
  .connect(
    `mongodb+srv://${env.DB_USER}:${env.DB_PASS}@${env.DB_NAME}.rvjhwfe.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => console.log(`Connecting: ${env.DB_NAME}`))
  .catch((err) => console.log(err));

app.listen(env.PORT, () => {
  console.log("Start");
});
