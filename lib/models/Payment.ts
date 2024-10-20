import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  email: { type: String, required: true },
  products: [
    {
      title: String,
      quantity: Number,
      price: Number,
      image: String,
    },
  ],
  totalAmount: { type: Number, required: true },
  address: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Payment || mongoose.model("Payment", paymentSchema);
