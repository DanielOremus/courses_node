import path from "path"
import fs from "fs"

export function removeImageSync(itemObj, pathToFolder) {
  if (!itemObj.imgSrc) {
    return false
  }
  const imagePath = path.join(pathToFolder, itemObj.imgSrc)
  if (!fs.existsSync(imagePath)) {
    return false
  }
  fs.unlinkSync(imagePath)
  return true
}
