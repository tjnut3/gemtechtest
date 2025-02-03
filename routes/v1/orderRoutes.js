const express = require("express");
const router = express.Router();
const orderController = require("../../controllers/orderController.js");
const {verifyAccessToken} = require("../../middlewares/auth");

// เส้นทาง CRUD
router.post("/", verifyAccessToken, orderController.createOrder);
router.get("/", orderController.getAllOrders);
router.get("/user/:userId", orderController.getOrdersByUser);
router.get("/:orderId", orderController.getOrderById);
router.put("/:orderId", orderController.updateOrderStatus);
router.delete("/:orderId", orderController.deleteOrder);

module.exports = router;
