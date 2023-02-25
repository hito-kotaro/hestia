const mongoose = require("mongoose");

const nonNegativeNumber = (value) => {
  if (value < 0) throw new Error("マイナスの値は不正です");
};

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  tags: {
    type: [String],
  },
  rate: {
    type: Number,
    default: 0,
    validate(value) {
      nonNegativeNumber(value);
    },
  },
});

const Recipe = mongoose.model("Recipe", RecipeSchema);
module.exports = Recipe;
