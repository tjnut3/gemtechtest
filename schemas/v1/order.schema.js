const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // เชื่อมโยงกับ User
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }, // เชื่อมโยงกับ Product
      quantity: { type: Number, required: true, min: 1 }, // จำนวนสินค้า
      price: { type: Number, required: true } // ราคาต่อหน่วย (snapshot)
    }
  ],
  totalPrice: { type: Number, required: true }, // ราคารวม
  status: { type: String, enum: ["Pending", "Paid", "Shipped", "Delivered", "Cancelled"], default: "Pending" }, // สถานะคำสั่งซื้อ
  createdAt: { type: Date, default: Date.now }, // วันที่สร้างออเดอร์
  updatedAt: { type: Date, default: Date.now }  // วันที่อัปเดตล่าสุด
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
