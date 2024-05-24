const { User } = require("../models");

module.exports = {
  //Get all users
  getUsers: async (req, res) => {
    try {
      const Users = await User.find()
        .populate("thoughts")
        .populate("friends")
        .select("-__v");
      return res.status(200).json(Users);
    } catch (err) {
      return res.status(400).json(err);
    }
  },
  //Get user by id
  getSingleUser: async (req, res) => {
    try {
      const user = await User.findone({ _id: req.params.userId })
        .populate("thoughts")
        .populate("friends")
        .select("-__v");

      if (!user) {
        return res.status(400).json({ message: "No user by that ID" });
      }

      return res.status(200).json(user);
    } catch (err) {
      return res.status(400).json(err);
    }
  },
  // create a new user
  createUser: async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      return res.status(200).json(newUser);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};
