import mongoose from "mongoose"
export default (mixed, value, searchField = null) => {
  if (!mixed) {
    return false
  }
  if (typeof mixed === "string") {
    return mixed === value
  }
  if (Array.isArray(mixed)) {
    return mixed.find(
      (el) => el === value || el.equals(new mongoose.Types.ObjectId(value))
    )
  }
}
