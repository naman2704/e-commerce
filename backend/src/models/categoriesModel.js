import { Schema, model } from "mongoose";

// const categoriesSchema = new Schema({
//   name: { type: String, required: true },
//   description: { type: String /* required: true */ },
// });
const categoriesSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String /* required: true */ },
  description: { type: String, default: "" },
});

const Category = model("category", categoriesSchema);
console.log("Category model: ", Category);

export default Category;
