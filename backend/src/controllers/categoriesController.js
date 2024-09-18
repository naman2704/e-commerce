import Category from "../models/categoriesModel.js";

export const createCategories = async (req, res) => {
  const { image, name, description } = req.body;
  console.log("categories req.body: ", req.body);
  let response = {
    status: 0,
    message: null,
  };
  if (!response.message) {
    const updatedCategories = new Category({ name });
    await updatedCategories.save();
    response.status = 1;
    response.message = "Categories updated successfully!";
  }
  res.json(response);
};

export const getAllCategories = async (req, res) => {
  try {
    let categories = await Category.find();
    console.log("categories: ", categories);
    res.json(
      categories.length > 0
        ? { status: 1, categories }
        : { status: 0, message: "No categories Available" }
    );
  } catch (error) {
    console.log(error);
    res.json({ status: 0, message: error.message });
  }
};

const deleteAllCategories = async () => {
  try {
    await Category.deleteMany({});
    console.log("All documents deleted successfully!");
  } catch (error) {
    console.error("Error deleting documents:", error);
  }
};
