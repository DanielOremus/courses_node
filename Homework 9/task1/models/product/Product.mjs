import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [1, "Price must be a positive number"],
  },
  amount: {
    type: Number,
    required: [true, "Amount is required"],
  },
})

export default mongoose.model("Product", productSchema)
