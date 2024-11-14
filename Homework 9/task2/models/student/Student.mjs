import mongoose from "mongoose"

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  age: {
    type: Number,
    required: [true, "Age is required"],
    min: [16, "Age must be greater or equal 16"],
  },
  averageScore: {
    type: Number,
    required: [true, "Average Score is required"],
    min: [1, "Average Score must be greater or equal 1"],
    max: [12, "Average Score must be lower or equal 12"],
  },
})

studentSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`
})

export default mongoose.model("Student", studentSchema)
