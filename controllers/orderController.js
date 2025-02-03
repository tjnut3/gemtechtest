const Order = require("../schemas/v1/order.schema");
const Product = require("../schemas/v1/product.Schema");

// (C) สร้างออเดอร์ใหม่
exports.createOrder = async (req, res) => {
  try {
    const { userId, products } = req.body;

    // คำนวณราคารวม
    let totalPrice = 0;
    for (let item of products) {
      const product = await Product.findById(item.productId);
      if (!product) return res.status(404).json({ message: "Product not found" });

      item.price = product.price; // Snapshot ราคาปัจจุบันของสินค้า
      totalPrice += item.price * item.quantity;
    }

    const newOrder = new Order({ userId, products, totalPrice });
    await newOrder.save();

    res.status(201).json({ message: "Order created", order: newOrder });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// (R) อ่านออเดอร์ทั้งหมด
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("userId", "name email").populate("products.productId", "name price");
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// (R) อ่านออเดอร์ทั้งหมดของ User คนหนึ่ง
exports.getOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId }).populate("products.productId", "name price");
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// อ่านออเดอร์ตามเลข Order ID
exports.getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId).populate("products.productId", "name price");
    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// อัพเดทสถานะ Order
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(orderId, { status, updatedAt: Date.now() }, { new: true });
    if (!updatedOrder) return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ message: "Order status updated", order: updatedOrder });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ลบออเดอร์
exports.deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const deletedOrder = await Order.findByIdAndDelete(orderId);
    if (!deletedOrder) return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
