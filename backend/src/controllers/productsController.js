import Product from "../models/productsModel.js";

export const getAllProducts = async (req, res) => {
  const { search } = req.body;
  let products;
  if (typeof search === "string" && search.trim().length > 0) {
    products = await Product.find({ name: search });
  } else {
    products = await Product.find();
  }
  const response =
    products.length > 0
      ? { status: 1, products }
      : { status: 0, message: "No products available!" };
  res.json(response);
};

export const createProduct = async (req, res) => {
  const { name, description, image, price, discount, rating, category } =
    req.body;
  console.log("req.body: ", req.body);
  let response = {
    status: 0,
    message: null,
  };
  if (!name) {
    response.message = "Product name is required.";
  } else if (!image) {
    response.message = "Product image is required.";
  } else if (!price) {
    response.message = "Product price is required.";
  } else if (!discount) {
    response.message = "Product discount is required.";
  } else if (!category) {
    response.message = "Product category is required.";
  }
  if (!response.message) {
    const product = new Product(req.body);
    await product.save();
    response.status = 1;
    response.product = product;
  }
  res.json(response);
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (product) {
    res.json({ status: 1, product });
  } else {
    res.json({ status: 0, message: "Product not found!" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  if (product) {
    res.json({ status: 1, product });
  } else {
    res.json({ status: 0, message: "Product not found!" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body);
  if (product) {
    res.json({ status: 1, product });
  } else {
    res.json({ status: 0, message: "Product not found!" });
  }
};
