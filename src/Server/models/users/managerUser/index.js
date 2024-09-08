const { addGuide } = require("./guides/addGuide")
const { downloadGuide } = require("./guides/downloadGuide")
const { deleteGuide } = require("./guides/deleteGuide")

module.exports = {
  addGuide: addGuide,
  downloadGuide: downloadGuide,
  deleteGuide: deleteGuide
}
