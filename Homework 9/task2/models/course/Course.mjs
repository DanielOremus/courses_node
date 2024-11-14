import mongoose from "mongoose"

const seminarSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: [true, "Topic is required"],
    trim: true,
  },
  responsibleStudent: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Responsible student must be attached"],
    ref: "Student",
  },
  lectionDuration: {
    type: Number,
    required: [true, "Lection Duration is required"],
    min: [1, "Lection must last at least 1 hour"],
  },
})

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, "Duration is required"],
    min: [7, "Course must last at least 7 days"],
  },
  students: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    validate: {
      validator: function (array) {
        return array.length
      },
      message: () => "At least 1 student must be attached",
    },
    ref: "Student",
  },
  seminars: [seminarSchema],
})

export default mongoose.model("Course", courseSchema)
