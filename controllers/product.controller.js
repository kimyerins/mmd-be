const { Error } = require("mongoose");
const Product = require("../models/Product");

const PAGE_SIZE = 5;
const productController = {};
productController.createProduct = async (req, res) => {
  try {
    const {
      sku,
      name,
      size,
      image,
      category,
      description,
      price,
      stock,
      status,
    } = req.body;
    const product = new Product({
      sku,
      name,
      size,
      image,
      category,
      description,
      price,
      stock,
      status,
    });
    await product.save();
    res.status(200).json({ status: "success", product });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

productController.getProducts = async (req, res) => {
  try {
    const { page, name } = req.query;
    const cond = name ? { name: { $regex: name, $options: "i" } } : {};
    let query = Product.find(cond);
    let response = { status: "success" };
    if (page) {
      query.skip((page - 1) * PAGE_SIZE).limit(PAGE_SIZE);
      //최종 몇개 페이지
      //데이터가 총 몇개 있는지
      //const totalItemNum = await Product.find(cond).count();
      const totalItemNum = await Product.countDocuments(cond);
      // 데이터 총개수/ PAGE_SIZE
      const totalPageNum = Math.ceil(totalItemNum / PAGE_SIZE);
      response.totalPageNum = totalPageNum;
    }

    const productList = await query.exec();
    response.data = productList;
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

productController.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { sku, name, size, image, description, category, stock, status } =
      req.body;
    const product = await Product.findByIdAndUpdate(
      { _id: productId },
      { sku, name, size, image, description, category, stock, status }
    );
    if (!product) throw new Error("item doesn't exist");
    res.status(200).json({ status: "success", data: product });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

module.exports = productController;
