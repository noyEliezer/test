const { login } = require("./authorization/login")
const { getUserSettings } = require("./settings/getUserSettings")
const { getGuides } = require("./guides/getGuides")
const { getSingleGuide } = require("./guides/getSingleGuide")

module.exports = {
  login: login,
  getUserSettings: getUserSettings,
  getGuides: getGuides,
  getSingleGuide: getSingleGuide
}
