const mongoose = require("mongoose");
const User = require("./User");
const Product = require("./Product");
const Schema = mongoose.Schema;
const orderSchema = Schema(
  {
    shipTo: { type: Object, required: true },
    contact: { type: Object, required: true },
    totalPrice: { type: Number, required: true, default: 0 },
    userId: { type: mongoose.objectId, ref: User, required: true },
    status: { type: String, default: "Preparing" },
    orderNum: { type: String },
    items: [
      {
        productId: { type: mongoose.objectId, ref: Product, required: true },
        size: { type: String, required: true },
        qty: { type: Number, default: 1, required: true },
        price: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

orderSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.__v;
  delete obj.updateAt;
  delete obj.createAt;
  return obj;
};

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
