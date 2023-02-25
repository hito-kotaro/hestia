const express = require("express");
const app = express();
const service = require("./recipeService");
const recipeModel = require("../../models/Recipe");

app.use(express.json());

exports.pick = async (recipes) => {
  // 受け取ったリストからランダムに1件取得する
};

exports.fetchData = async (rate) => {
  let recipes;
  if (rate == 0) {
    recipes = await recipeModel.find({});
  } else {
    recipes = await recipeModel.find({ rate: { $gte: rate } });
  }

  return recipes;
};

exports.fetchDataWithTags = async (rate, tags, condition) => {
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
  return recipes;
};
