const { User } = require("../models");

module.exports = {
  //Get all users
  getUsers: async (req, res) => {
    try {
      const Users = await User.find().populate("thoughts").populate("friends");
      return res.status(200).json(Users);
    } catch (err) {
      return res.status(400).json(err);
    }
  },
  //Get user by id
};
