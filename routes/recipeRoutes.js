const express = require("express");
const app = express();
const recipeModel = require("../models/Recipe");

app.use(express.json());

// データ取得
app.get("/recipes", async (req, res) => {
  console.log("untag");
  const rate = Number(req.query.rate ?? 0);
  let recipes;
  if (rate == 0) {
    recipes = await recipeModel.find({});
  } else {
    recipes = await recipeModel.find({ rate: { $gte: rate } });
  }

  try {
    res.send(recipes);
  } catch (err) {
    res.status(500).send(err);
  }
});

// データ取得(tagあり)
app.get("/recipes/:tags", async (req, res) => {
  const condition = Number(req.query.condition ?? 0);
  const rate = Number(req.query.rate ?? 0);
  const tags = req.params.tags.split(",");

  let recipes;
  // condition 0なら指定タグを全て含む
  // condition 1なら指定タグのいずれかを含む
  if (rate == 0) {
    if (condition == 0) {
      // 指定タグ全てを含む
      recipes = await recipeModel.find({ tags: { $all: tags } });
    } else {
      // 指定タグのいずれかを含む
      recipes = await recipeModel.find({ tags: { $in: tags } });
    }
  } else {
    if (condition == 0) {
      // 指定タグ全てを含む
      recipes = await recipeModel.find({
        tags: { $all: tags },
        rate: { $gte: rate },
      });
    } else {
      // 指定タグのいずれかを含む
      recipes = await recipeModel.find({
        tags: { $in: tags },
        rate: { $gte: rate },
      });
    }
  }

  try {
    res.send(recipes);
  } catch (err) {
    res.status(500).send(err);
  }
});

// ID指定データ取得
app.get("/recipe/:id", async (req, res) => {
  const id = req.params.id;
  const recipe = await recipeModel.findOne({ id });
  try {
    res.send(recipe);
  } catch (err) {
    res.status(500).send(err);
  }
});

// データ登録
app.post("/recipe", async (req, res) => {
  const recipe = new recipeModel(req.body);
  try {
    await recipe.save();
    res.send(recipe);
  } catch (err) {
    res.status(500).send(err);
  }
});

// データ更新
app.patch("/recipe/:id", async (req, res) => {
  try {
    console.log(req.body);
    await recipeModel.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).send(req.body);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// データ削除
app.delete("/recipe/:id", async (req, res) => {
  try {
    await recipeModel.findByIdAndDelete(req.params.id);
    res.status(200).send(req.params.id);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app;
