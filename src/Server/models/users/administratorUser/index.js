const { addUser } = require("./usersManagement/addUser")
const { updateUser } = require("./usersManagement/updateUser")
const { deleteUser } = require("./usersManagement/deleteUser")
const { getUsers } = require("./usersManagement/getUsers")
const { searchUser } = require("./usersManagement/searchUser")

module.exports = {
  addUser: addUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
  getUsers: getUsers,
  searchUser: searchUser
}
