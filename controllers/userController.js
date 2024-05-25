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
      console.log(`Fetching user with ID: ${req.params.userId}`);
      const user = await User.findOne({ _id: req.params.userId })
        .populate("thoughts")
        .populate("friends")
        .select("-__v");
      console.log("User found:", user);
      if (!user) {
        console.log("No user found with that ID");
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
  //Update user by id
  updateUser: async (req, res) => {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(400).json({ message: "User not found" });
      }

      return res.status(200).json(updatedUser);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  //delete user
  deleteUser: async (req, res) => {
    try {
      const deletedUser = await User.findOneAndDelete({
        _id: req.params.userId,
      });

      if (!deletedUser) {
        return res.status(400).json({ message: "User not found" });
      }

      return res.status(200).json(deletedUser);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  //add a friend to user
  addFriend: async (req, res) => {
    try {
      const result = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );

      if (!result) {
        return res.status(400).json({ message: "User not found" });
      }

      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  //remove a friend from user
  removeFriend: async (req, res) => {
    try {
      const result = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      if (!result) {
        return res.status(400).json({ message: "User not found" });
      }

      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};
