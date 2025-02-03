const Product = require("../schemas/v1/product.Schema");

// สร้างสินค้า
exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, stock, category } = req.body;
    const newProduct = new Product({ name, price, description, stock, category });
    await newProduct.save();
    res.status(201).json({ message: "Product created", product: newProduct });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// อ่านสินค้าทั้งหมด
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// อ่านสินค้าตาม ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// อัพเดทสินค้า
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product updated", product: updatedProduct });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ลบสินค้า
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
