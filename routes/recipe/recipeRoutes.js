const express = require("express");
const cors = require("cors");
const app = express();
const service = require("./recipeService");
const recipeModel = require("../../models/Recipe");

app.use(express.json());
app.use(cors());

// ランダムピック
app.get("/recipe/random", async (req, res) => {
  const rate = Number(req.query.rate ?? 0);
  const recipes = await service.fetchData(rate);
  // 0からrecipes.lengthの範囲でランダム取得
  const rand = Math.floor(Math.random() * recipes.length);

  try {
    res.send(recipes[rand]);
  } catch (err) {
    res.status(500).send(err);
  }
});

// ランダムピック
app.get("/recipe/random/:tags", async (req, res) => {
  const rate = Number(req.query.rate ?? 0);
  const condition = Number(req.query.condition ?? 0);
  const tags = req.params.tags.split(",");
  const recipes = await service.fetchDataWithTags(rate, tags, condition);
  // 0からrecipes.lengthの範囲でランダム
  const rand = Math.floor(Math.random() * recipes.length);
  try {
    res.send(recipes[rand]);
  } catch (err) {
    res.status(500).send(err);
  }
});

// データ取得
app.get("/recipes", async (req, res) => {
  const rate = Number(req.query.rate ?? 0);
  console.log(rate);
  const recipes = await service.fetchData(rate);

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
  const recipes = await service.fetchDataWithTags(rate, tags, condition);
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

// tagのみ取得
app.get("/tags", async (req, res) => {
  console.log("tags!");
  // const tags = await recipeModel.find().select("tags");
  const tags = await recipeModel.distinct("tags");
  console.log(tags);

  try {
    res.send(tags);
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
