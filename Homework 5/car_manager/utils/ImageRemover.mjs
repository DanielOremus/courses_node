import path from "path"
import fs from "fs"

export function removeImageSync(itemObj, pathToFolder) {
  const imagePath = path.join(pathToFolder, itemObj.imgSrc)
  if (itemObj.imgSrc && fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath)
    return true
  }
  return false
}
